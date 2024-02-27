package com.example.farmfarm_react.config.jwt;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.example.farmfarm_react.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RequiredArgsConstructor
@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    private static Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class);


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        //요청 헤더의 Authorization 항목 값을 가져와 jwtHeader 변수에 담는다.
        String jwtHeader = ((HttpServletRequest)request).getHeader((JwtProperties.HEADER_STRING));
        //만약 jwtHeader 가 null 이거나 Bearer 로 시작하지 않으면 return; 으로 이후 로직을 실행시키지 않고 넘긴다.
        if (jwtHeader == null || !jwtHeader.startsWith(JwtProperties.TOKEN_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        //jwtHeader 가 제대로 된 형식이라면 토큰 앞의 Bearer 를 떼어내 token 변수에 담는다.
        String token = jwtHeader.replace(JwtProperties.TOKEN_PREFIX, "");
        Long userCode = null;
        System.out.print("토큰 값 : " + token);
        logger.debug("토큰 값 : " + token);
        logger.debug("userCode : " + userCode);

        //token 을 비밀 키로 복호화하는 동시에 개인 클레임에 넣어뒀던 id 값을 가져온다. 이 코드 자체가 인증과정이므로 이어지는 catch 문에서 Exception 처리를 해준다.
        try {
            userCode = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token)
                    .getClaim("id").asLong();
            System.out.print("유저 : " + userCode);
        } catch (TokenExpiredException e) {
            e.printStackTrace();
            request.setAttribute(JwtProperties.HEADER_STRING, "토큰이 만료되었습니다.");
        } catch (JWTVerificationException e) {
            e.printStackTrace();
            request.setAttribute(JwtProperties.HEADER_STRING, "유효하지 않은 토큰입니다.");
        }
        //userCode 에 값이 잘 담겼다면 request.setAttribute("userCode", userCode) 로 값을 넘긴다.
        request.setAttribute("userCode", userCode);
        //filterChain 에 request response 값을 넘긴다.
        filterChain.doFilter(request, response);
    }
}
