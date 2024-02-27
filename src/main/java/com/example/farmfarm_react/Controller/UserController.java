package com.example.farmfarm_react.Controller;

import com.example.farmfarm_react.config.jwt.JwtProperties;
import com.example.farmfarm_react.Entity.UserEntity;
import com.example.farmfarm_react.Entity.oauth.OauthToken;
import com.example.farmfarm_react.Repository.UserRepository;
import com.example.farmfarm_react.Service.FarmService;
import com.example.farmfarm_react.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@SessionAttributes({"Authorization", "user", "myFarm"})
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService; //(1)만들어둔 UserRepository 를 @Autowired 해준다.
    @Autowired
    private FarmService farmService;

    @Value("${KakaoAuthUrl}")
    private String KakaoAuthUrl;

    @Value("${KakaoApiKey}")
    private String KakaoApiKey;

    @Value("${RedirectURI}")
    private String RedirectURI;

    @Value("${KakaoApiUrl}")
    private String KakaoApiUrl;

    @Value("${serverUrl}")
    private String serverUrl;
    @Autowired
    private UserRepository userRepository;

    @ResponseBody
    @GetMapping(value = "/login/getKakaoAuthUrl")
    public String getKakaoAuthUrl(HttpServletRequest request){
        String reqUrl = KakaoAuthUrl + "/oauth/authorize?client_id=" + KakaoApiKey + "&redirect_uri="+ RedirectURI + "&response_type=code";
        System.out.println(reqUrl);
        return reqUrl;
    }

    // 프론트에서 인가코드 받아오는 url
    @GetMapping("/login/oauth_kakao")
    ResponseEntity getLogin(@RequestParam("code") String code) {
        // 넘어온 인가 코드를 통해 access_token 발급
        OauthToken oauthToken= userService.getAccessToken(code);
        // 발급 받은 accessToken 으로 카카오 회원 정보 DB 저장 후 JWT 를 생성
        //UserService 의 기존 SaveUser 메소드를 수정한다
        String jwtToken = userService.saveUserAndGetToken(oauthToken.getAccess_token());
        //응답 헤더의 Authorization 이라는 항목에 JWT 를 넣어준다.
        HttpHeaders headers = new HttpHeaders();
        headers.add(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX + jwtToken);
        //JWT 가 담긴 헤더와 200 ok 스테이터스 값, "success" 라는 바디값을 ResponseEntity 에 담아 프론트 측에 전달한다.
        return ResponseEntity.ok().headers(headers).body(null);
    }

    @GetMapping("/me")
    public ResponseEntity<Object> getCurrentUser(HttpServletRequest request) {
        UserEntity user = userService.getUser(request);
        return ResponseEntity.ok().body(user);
    }

    @DeleteMapping("/")
    public ResponseEntity<Object> deleteUser(HttpServletRequest request) {
        UserEntity user = userService.getUser(request);
        UserEntity newUser = userService.deleteUser(user);
        return ResponseEntity.ok().body(newUser);
    }

    @GetMapping("/nickname")
    public String getNicknameForm(Model model, @ModelAttribute("Authorization") String Auth) {
        model.addAttribute("Authorization", Auth);

        return "myPage/createNickname";
    }

    @GetMapping("/nickname/create")
    public String setNickname(HttpServletRequest request, @RequestParam String nickname, Model model) {
        //UserEntity user = (UserEntity)session.getAttribute("user");
        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!" + nickname);
        UserEntity newUser = userService.setNickname(userService.getUser(request), request.getParameter("nickname"));
        model.addAttribute("user", newUser);
        return "redirect:/";
    }

    @GetMapping("/profile")
    public String updateProfileForm() {
        return "myPage/editMyPage";
    }

    @PostMapping("/profile")
    public ResponseEntity<Object> updateProfile(@RequestBody UserEntity updateUser, HttpSession session, Model model) {
        System.out.println("updateUser1" + updateUser.getImage());
        System.out.println("updateUser2" + updateUser.getNickname());
        UserEntity user = (UserEntity)session.getAttribute("user");
        UserEntity getUser = userService.findById(user.getId());
        getUser.setNickname(updateUser.getNickname());
        getUser.setImage(updateUser.getImage());
        UserEntity saveUser = userRepository.save(getUser);
        model.addAttribute("user", saveUser);
        return ResponseEntity.ok().body(saveUser);
    }

    @GetMapping("logout")
    public String logout(SessionStatus session) {
        session.setComplete();
        return "redirect:/index";
    }
}
