package dispatchPlus.controller;

import dispatchPlus.entity.*;
import dispatchPlus.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@Controller
public class OrderItemController {
    @Autowired
    private CartService cartService;

    @Autowired
    private OrderItemService orderItemService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private StationService stationService;

    @ResponseBody
    @RequestMapping(value = "/history", method = RequestMethod.GET, produces = APPLICATION_JSON_VALUE)
    public List<OrderItem> orderItemHistory() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        Customer customer = customerService.getCustomerByUserName(username);
        Cart cart = customer.getCart();
        List<OrderItem> orderItems = cart.getOrderItems();
        for (int i = 0; i < orderItems.size(); ++i) {
            OrderItem orderItem = orderItems.get(i);
            if (orderItem.getStatus() < 5) {
                orderItems.set(i, trackCartItem(orderItem.getId()));
            }
        }
        return orderItems;
    }

    @ResponseBody
    @RequestMapping(value = "/track", method = RequestMethod.GET, produces = APPLICATION_JSON_VALUE)
    public List<OrderItem> trackCart() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        Customer customer = customerService.getCustomerByUserName(username);
        Cart cart = customer.getCart();
        List<OrderItem> orderItems = cart.getOrderItems();
        List<OrderItem> result = new ArrayList<>();
        for (OrderItem orderItem : orderItems) {
            if (orderItem.getStatus() < 4) {
                orderItem = trackCartItem(orderItem.getId());
            }
            if (orderItem.getStatus() < 4) {
                result.add(orderItem);
            }
        }
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/track_cart_item", method = RequestMethod.GET, produces = APPLICATION_JSON_VALUE)
    public OrderItem trackCartItem(@RequestParam(value = "order_item_id") int orderItemId) {
        OrderItem orderItem = orderItemService.getOrderItemById(orderItemId);
        if (orderItem.getStatus() >= 5) return orderItem;
        LocalDateTime dateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String curTime = formatter.format(dateTime);
        if (curTime.compareTo(orderItem.getArriveTime()) >= 0) {
            orderItem.setStatus(5);
            Device device = deviceService.getDeviceById(orderItem.getDeviceId());
            device.setStatus(0);
            deviceService.updateDevice(device);
        }
        else if (curTime.compareTo(orderItem.getDeliveryTime()) >= 0) {
            orderItem.setStatus(4);
        }
        else if (curTime.compareTo(orderItem.getPickUpTime()) >= 0) {
            orderItem.setStatus(3);
        }
        else if (curTime.compareTo(orderItem.getDepartureTime()) >= 0) {
            orderItem.setStatus(2);
        }
        orderItemService.updateOrderItem(orderItem);
        return orderItem;
    }

    @ResponseBody
    @RequestMapping(value = "/add_order", produces = APPLICATION_JSON_VALUE)
    public OrderItem addCartItem(@RequestBody AddOrderRequestBody reqBody, HttpServletResponse response) {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        Customer customer = customerService.getCustomerByUserName(username);
        Cart cart = customer.getCart();
        OrderItem orderItem = new OrderItem();
        orderItem.setCart(cart);
        orderItem.setStatus(reqBody.getStatus());
        orderItem.setDepartureTime(reqBody.getDepartureTime());
        orderItem.setPickUpTime(reqBody.getPickUpTime());
        orderItem.setDeliveryTime(reqBody.getDeliveryTime());
        orderItem.setArriveTime(reqBody.getArriveTime());
        orderItem.setPickUpAddress(reqBody.getPickUpAddress());
        orderItem.setDeliveryAddress(reqBody.getDeliveryAddress());
        orderItem.setPrice(reqBody.getPrice());
        // find available device
        List<Station> stations = stationService.getAllStationsDetail();
        for (Station station : stations) {
            List<Device> devices = station.getDevices();
            for (Device device : devices) {
                if (device.getType() == reqBody.getDeviceType() && device.getStatus() == 0) {
                    device.setStatus(1);
                    deviceService.updateDevice(device);
                    orderItem.setDeviceId(device.getId());
                    orderItem.setStatus(1);
                    orderItemService.addCartItem(orderItem);
                    // find the new orderItemId
                    cart = cartService.getCartById(cart.getId());
                    List<OrderItem> orderItems = cart.getOrderItems();
                    response.setStatus(HttpServletResponse.SC_CREATED);
                    return orderItems.get(orderItems.size() - 1);
                }
            }
        }
        response.setStatus(HttpServletResponse.SC_CONFLICT);
        return null;
    }

    @ResponseBody
    @RequestMapping(value = "/place_order", produces = APPLICATION_JSON_VALUE)
    public String placeOrder(@RequestParam(value = "order_item_id") int orderItemId, HttpServletResponse response) {
        // TODO: verify order_item_id
        OrderItem orderItem = orderItemService.getOrderItemById(orderItemId);
        Device device = deviceService.getDeviceById(orderItem.getDeviceId());
        if (device == null || device.getStatus() != 0) {
            response.setStatus(HttpServletResponse.SC_CONFLICT);
            return "device is not available";
        }
        device.setStatus(1);
        deviceService.updateDevice(device);
        orderItem.setStatus(1);
        orderItemService.updateOrderItem(orderItem);
        response.setStatus(HttpServletResponse.SC_CREATED);
        return "device is reserved";
    }

    @RequestMapping(value = "/remove_cart_item", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void removeCartItem(@RequestParam(value = "order_item_id") int orderItemId) {
        //OrderItem orderItem = orderItemService.getOrderItemById(orderItemId);
        //Device device = orderItem.getDevice();
        //device.setStatus(0);
        //deviceService.updateDevice(device);
        orderItemService.removeCartItem(orderItemId);
    }

    @RequestMapping(value = "/remove_all_items", method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    public void removeAllCartItems(@RequestParam(value = "cartId") int cartId) {
        Cart cart = cartService.getCartById(cartId);
        orderItemService.removeAllCartItems(cart);
    }

}