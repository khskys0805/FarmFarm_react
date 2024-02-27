package com.example.farmfarm_react.Controller;

import com.example.farmfarm_react.Entity.FarmEntity;
import com.example.farmfarm_react.Entity.ProductEntity;
import com.example.farmfarm_react.Entity.RegionDataEntity;
import com.example.farmfarm_react.Entity.UserEntity;
import com.example.farmfarm_react.Service.CategoryService;
import com.example.farmfarm_react.Service.FarmService;
import com.example.farmfarm_react.Service.ProductService;
import com.example.farmfarm_react.Service.UserService;
import org.h2.engine.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@SessionAttributes({"user", "myFarm"})
public class HomeController {
    @Autowired
    UserService userService;
    @Autowired
    FarmService farmService;
    @Autowired
    ProductService productService;
    @Autowired
    CategoryService categoryService;
    @Value("${serverUrl}")
    private String serverUrl;
    @GetMapping("/index")
    public String control(HttpServletRequest request, HttpSession session) {
        try {
            System.out.println("print session Authorization : " + session.getAttribute("user"));
            if (session.getAttribute("user") != null) {
                UserEntity user = (UserEntity)session.getAttribute("user");
                session.setAttribute("uid", user.getUId());
                return "redirect:" + serverUrl + "/";
            }
            else if (session.getAttribute("user") == null){
                System.out.println("/kakao로 redirect!!!");
                return "redirect:/kakao";
            }
            return "redirect:/kakao";
        } catch (Exception e) {
            return "redirect:/kakao";
        }
    }

    @GetMapping("/popup")
    public String popup(HttpServletRequest request, HttpSession session) {
        return "jusoPopup";
    }
    @PostMapping("/popup")
    public String popupPost(HttpServletRequest request, String inputYn, HttpSession session, Model model) {
        System.out.println("popupPost 요청");
        String siNm = request.getParameter("siNm");
        String sggNm = request.getParameter("sggNm");
        String roadAddrPart1 = request.getParameter("roadAddrPart1");
        String addrDetail = request.getParameter("addrDetail");
        model.addAttribute("siNm", siNm);
        model.addAttribute("sggNm", sggNm);
        model.addAttribute("roadAddrPart1", roadAddrPart1);
        model.addAttribute("addrDetail", addrDetail);
        model.addAttribute("inputYn", inputYn);
        System.out.println(siNm + " " + sggNm + " " + roadAddrPart1 + " " + addrDetail);
        return "jusoPopup";
    }

    @GetMapping("/shippingpopup")
    public String shippingpopup(HttpServletRequest request, HttpSession session) {
        return "jusoPopup";
    }
    @PostMapping("/shippingpopup")
    public String shippingpopupPost(HttpServletRequest request, String inputYn, HttpSession session, Model model) {
        System.out.println("popupPost 요청");
        String siNm = request.getParameter("siNm");
        String sggNm = request.getParameter("sggNm");
        String roadAddrPart1 = request.getParameter("roadAddrPart1");
        String addrDetail = request.getParameter("addrDetail");
        model.addAttribute("siNm", siNm);
        model.addAttribute("sggNm", sggNm);
        model.addAttribute("roadAddrPart1", roadAddrPart1);
        model.addAttribute("addrDetail", addrDetail);
        model.addAttribute("inputYn", inputYn);
        System.out.println(siNm + " " + sggNm + " " + roadAddrPart1 + " " + addrDetail);
        return "jusoPopup";
    }


    @GetMapping("/")
    public String home(HttpServletRequest request, Model model, HttpSession session) {
        if (session.getAttribute("user") != null) {
            UserEntity user = (UserEntity)session.getAttribute("user");
            session.setAttribute("uid", user.getUId());
        }
        else if (session.getAttribute("user") == null){
            System.out.println("/kakao로 redirect!!!");
            return "redirect:/kakao";
        }
        List<ProductEntity> products = productService.getAllProduct();
        model.addAttribute("products", products);
        List<ProductEntity> auctions = productService.getAllAuctionProduct();
        model.addAttribute("auctions", auctions);
        List<FarmEntity> farms = farmService.getFarmsOrderBy("new");
        model.addAttribute("farms", farms);
        return "home/home";
    }
    @GetMapping("/kakao")
    public String login(HttpServletRequest request) {
        return "common/index";
    }

    @GetMapping("/home/")
    public String home2(HttpServletRequest request) {
        return "home/home";
    }

//    @GetMapping("/category")
//    public String category() {
//        return "category/categories";
//    }


    @GetMapping("/category")
    public String category(Model model) {
        List<String> sidoList = categoryService.getDistinctSidoValues();
        model.addAttribute("sidoList", sidoList);
        return "category/categories";
    }
    @ResponseBody
    @PostMapping("/category")
    public List<String> getGugunList(@RequestParam String selectedSido) {
        // 사용자가 선택한 시에 해당하는 구군(gugun) 목록을 가져옵니다.
        List<String> gugunList = categoryService.getDistinctGugunValuesBySido(selectedSido);

        return gugunList;
    }


    @GetMapping("/search")
    public String search() {
        return "search/search";
    }

    @GetMapping("/cart")
    public String cart() {
        return "home/product/shoppingCart";
    }

    @PostMapping("/myPage")
    @ResponseBody
    public Map<String, Object> myPage(HttpServletRequest request, Model model, HttpSession session) {
        System.out.println(request.getHeaderNames());
        Map<String, Object> mv = new HashMap<>();
        UserEntity user = (UserEntity)session.getAttribute("user");
        FarmEntity myFarm = farmService.getMyFarm(user);
//        if (!myFarm.getStatus().equals("yes")) {
//            myFarm = null;
//            System.out.println("여기 안찍히냐?");
//        }
//        System.out.println("111111111" + myFarm.getStatus());
        mv.put("user", user);
        model.addAttribute("user", user);
        session.setAttribute("uid", user.getUId());
        if (myFarm == null) {
            System.out.println("bbbbnull!!!!!!!!!");
            model.addAttribute("myFarm", null);
            mv.put("myFarm", null);
        }
        else {
            model.addAttribute("myFarm", myFarm);
            mv.put("myFarm", myFarm);
        }
        return mv;
    }

    @GetMapping("/myPage")
    public ModelAndView myPage(HttpSession session, Model model) {
        if (session.getAttribute("user") == null){
            System.out.println("/kakao로 redirect!!!");
            ModelAndView mav = new ModelAndView("common/index");
            return mav;
        }
        ModelAndView mav = new ModelAndView("myPage/myPage");
        UserEntity user = (UserEntity)session.getAttribute("user");
        FarmEntity myFarm = farmService.getMyFarm(user);
        System.out.println("myFarm : " + myFarm);
        mav.addObject("user", user);
        session.setAttribute("uid", user.getUId());
        if (myFarm == null) {
            session.removeAttribute("myFarm");
            mav.addObject("myFarm", null);
            model.addAttribute("myFarm", null);
        }
        else {
            mav.addObject("myFarm", myFarm);
        }
        return mav;
    }
}
