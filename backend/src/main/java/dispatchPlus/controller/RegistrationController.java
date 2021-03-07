package dispatchPlus.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

// get APPLICATION_JSON_VALUE and APPLICATION_XML_VALUE
import static org.springframework.http.MediaType.*;

import dispatchPlus.entity.Customer;
import dispatchPlus.service.CustomerService;

// cross origin
@CrossOrigin("*")
// Under the hood, @RestController is @Controller + @ResponseBody,
// and it avoids the need of prefixing every method with @ResponseBody.
@RestController
@RequestMapping("/")
public class RegistrationController {

    @Autowired
    private CustomerService customerService;

    @PostMapping(
            //value = "/register",
            consumes = {APPLICATION_JSON_VALUE, APPLICATION_XML_VALUE},
            produces = {APPLICATION_JSON_VALUE, APPLICATION_XML_VALUE}
    )
    /*
    @RequestMapping(value = "/customer/registration", method = RequestMethod.GET)
    public ModelAndView getRegistrationForm() {
        Customer customer = new Customer();
        return new ModelAndView("register", "customer", customer);
    }
    */

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public Customer registerCustomer(@RequestBody Customer customer) {

        customerService.addCustomer(customer);

        return customer;
    }
}
