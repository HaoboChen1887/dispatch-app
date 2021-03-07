package dispatchPlus.controller;

import dispatchPlus.entity.Cart;
import dispatchPlus.entity.Customer;
import dispatchPlus.entity.OrderItem;
import dispatchPlus.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @RequestMapping(value = "/customer_info", method = RequestMethod.GET, produces = APPLICATION_JSON_VALUE)
    public Customer customerInfo() {
        Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
        String username = loggedInUser.getName();
        return customerService.getCustomerByUserName(username);
    }
}
