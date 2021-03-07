package dispatchPlus.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import dispatchPlus.entity.LoginRequestBody;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;



import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        if (!request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException("Authentication method not supported: " + request.getMethod());
        }

        UsernamePasswordAuthenticationToken authRequest;
        try {
            //System.out.println("parse request");
            ObjectMapper mapper = new ObjectMapper();
            LoginRequestBody body = mapper.readValue(request.getReader(), LoginRequestBody.class);
            if (body == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                return null;
            }

            authRequest = new UsernamePasswordAuthenticationToken(body.getEmail(), body.getPassword());
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            throw new InternalAuthenticationServiceException("Failed to parse authentication request body");
        }
        setDetails(request, authRequest);
        return this.getAuthenticationManager().authenticate(authRequest);
    }
}
