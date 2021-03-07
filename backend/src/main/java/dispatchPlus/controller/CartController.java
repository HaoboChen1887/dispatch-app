package dispatchPlus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import dispatchPlus.entity.Cart;
import dispatchPlus.entity.Customer;
import dispatchPlus.service.CartService;
import dispatchPlus.service.CustomerService;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;


@RestController
public class CartController {
    @Autowired
    private CustomerService customerService;

    @Autowired
    private CartService cartService;

    @GetMapping( produces = APPLICATION_JSON_VALUE)
    @RequestMapping(value = "/get_cart", method = RequestMethod.GET)
    @ResponseBody
    public Cart getCartItems() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        Customer customer = customerService.getCustomerByUserName(username);
        Cart cart = customer.getCart();
        cartService.updateCart(cart);
        cart = cartService.getCartById(cart.getId());
        return cart;
    }
}