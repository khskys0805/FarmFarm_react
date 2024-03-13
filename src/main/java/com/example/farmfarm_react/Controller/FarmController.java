package com.example.farmfarm_react.Controller;

import com.example.farmfarm_react.Entity.*;
import com.example.farmfarm_react.Service.*;
import org.apache.http.protocol.ResponseServer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import com.google.gson.Gson;

@Controller
@SessionAttributes("myFarm")
@RequestMapping("/farm")
public class FarmController {
    @Autowired
    private FarmService farmService;
    @Autowired
    private ProductService productService;
    @Autowired
    private OrderDetailService orderDetailService;
    @Autowired
    private UserService userService;

    // 농장 개설
    @PostMapping("")
    public ResponseEntity<Object> createFarm(@RequestHeader("uid") String headerUId, @RequestBody FarmEntity farm, Model model, HttpSession session) {
        System.out.println(headerUId);
        long huid = Long.parseLong(headerUId);
        System.out.println(huid);
        UserEntity user = (UserEntity)session.getAttribute("user");
        if (user == null) {
            user = userService.findByUId(huid);
            System.out.println("로그인 풀림ㅋ");
            System.out.println(user);
            session.setAttribute("user", user);
        }
        FarmEntity newFarm = farmService.saveFarm(user, farm);
        model.addAttribute("myFarm", newFarm);
        return ResponseEntity.ok().body(newFarm);
    }
    @GetMapping("")
    public String createFarmForm(HttpSession session) {
        return "home/farm/registerFarm";
    }

    //농장 전체 조회, 농장 정렬
    @GetMapping("/list")
    public ResponseEntity<Object> getSortedFarm(@RequestParam(required = false, defaultValue = "rating", value = "sort") String criteria,
                                                @RequestParam(required = false, defaultValue = "", value = "keyword") String keyword,
                                                @RequestParam(required = false, defaultValue = "", value = "si") String si,
                                                @RequestParam(required = false, defaultValue = "", value = "gugun") String gugun) {
        List allFarm = new ArrayList<>();

        if (!si.equals("") && !gugun.equals("")) {
            allFarm = farmService.searchByLocation(si, gugun);
            return ResponseEntity.ok().body(allFarm);
        }

        if (keyword.equals("")) {
            allFarm = farmService.getFarmsOrderBy(criteria);
        } else {
            allFarm = farmService.searchSortFarms(keyword, criteria);
        }

        return ResponseEntity.ok().body(allFarm);
    }


    // 농장 조회 ( 전체 농장 리스트에서 클릭 시 해당 농장 페이지로 이동)
    @GetMapping("/{f_id}")
    public ModelAndView getFarm(@PathVariable("f_id") long fId) {
        ModelAndView mav = new ModelAndView("home/farm/farmDetails");
        FarmEntity farm = farmService.getFarm(fId);
        List<ProductEntity> productList = productService.getFarmProduct(farm);
        List<OrderDetailEntity> allOrderDetailList = new ArrayList<>();
        for (ProductEntity product : productList) {
            allOrderDetailList.addAll(orderDetailService.getAllOrderDetail(product));
        }
        mav.addObject("farm", farm);
        mav.addObject("productList", productList);
        mav.addObject("myFarmOrderList", allOrderDetailList);
        return mav;
    }

    // 나의 농장 조회
    @GetMapping("/my")
    public String getMyFarm(HttpServletRequest request, HttpSession session) {
        UserEntity user = (UserEntity)session.getAttribute("user");
        FarmEntity myFarm = farmService.getMyFarm(user);
        String fId = myFarm.getFId().toString();
        System.out.println("나의 farm Id 조회: " + fId);
        return "redirect:" + fId ;
    }

    //주문 내역 상태 변경
    @PatchMapping("/order/{od_id}")
    public ResponseEntity<Object> patchOrderDetail(HttpServletRequest request, @PathVariable("od_id") long odId, @RequestBody OrderDetailEntity orderDetail) {
        OrderDetailEntity updateOrderDetail1 = orderDetailService.updateOrderDetail(request, odId, orderDetail);
        return ResponseEntity.ok().body(updateOrderDetail1);
    }

    // 농장별 상품 보기
    @GetMapping("/{f_id}/product")
    public ResponseEntity<Object> getFarmProduct(@PathVariable("f_id") long fId){
        FarmEntity farm = farmService.getFarm(fId);
        List<ProductEntity> productList = productService.getFarmProduct(farm);
        return ResponseEntity.ok().body(productList);
    }

    // 농장 정보 수정
    @PutMapping("/{f_id}")
    public ResponseEntity<Object> putFarm(HttpServletRequest request, @PathVariable("f_id") long fId, @RequestBody FarmEntity farm) {
        FarmEntity updateFarm = farmService.updateFarm(request, fId, farm);
        if (updateFarm == null) {
            return ResponseEntity.badRequest().body("user not match");
        }
        return ResponseEntity.ok().body(updateFarm);
    }

    // 농장 삭제
    @DeleteMapping("/{f_id}")
    public ResponseEntity<Object> deleteFarm(HttpSession session, @PathVariable("f_id") long fId, Model model)  {
        try {
            farmService.deleteFarm(session, fId);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("");
        }
        model.addAttribute("myFarm", null);
        return ResponseEntity.ok().body("delete OK");
    }

    @GetMapping("/list/{sido}/{gugun}")
    public String getFarmList(@PathVariable("sido") String locationCity, @PathVariable("gugun") String locationGu, Model model) {
        // gugunService를 사용하여 선택된 구군에 해당하는 농장 목록을 가져옵니다.
        List<FarmEntity> farms = farmService.searchByLocation(locationCity, locationGu);

        model.addAttribute("farms", farms);
        return "home/farm/farmList"; // farmList.jsp로 포워딩
    }
}

