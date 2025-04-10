# 1. Project Overview (프로젝트 개요)
- 프로젝트 이름: FarmFarm
- 프로젝트 설명: 도시 농부를 위한 농작물 거래 서비스

<br/>
<br/>

# 2. Team Members (팀원 및 팀 소개)
|                                                        김현수                                                        |
|:-----------------------------------------------------------------------------------------------------------------:|
| <img src="https://github.com/user-attachments/assets/af16adf8-5ef7-4c46-8316-375571920f3c" alt="김현수" width="150"> |
|                                                        FE                                                         |
|                                      [GitHub](https://github.com/khskys0805)                                      |

<br/>
<br/>

# 3. Key Features (주요 기능)
- **로그인**:
    - 카카오 로그인을 통해 간편하게 로그인할 수 있습니다.

- **농장**:
    - 누구나 손쉽게 농장을 개설할 수 있으며, 상품 판매를 위해 농장 개설은 필수입니다.
    - 농장 리스트 확인 및 검색 기능을 제공합니다.
    - 농장 위치는 지도에 마커로 표시되어 시각적으로 확인할 수 있습니다.

- **일반 상품**:
    - 사용자는 본인의 농장에 일반 상품을 등록하고 판매할 수 있습니다.
    - 상품 검색 기능을 통해 원하는 상품을 쉽게 찾을 수 있습니다.

- **공동구매 상품**:
    - 판매자는 공동구매 상품 등록을 통해 더 저렴한 가격으로 팀원 1명과 함께 구매하도록 유도할 수 있습니다.
    - 공동구매는 오픈 이후 24시간 이내에 성사되어야 하며, 마감 시까지 팀원이 충족되면 구매가 완료됩니다.

- **경매 상품**:
    - 판매자가 등록한 경매 상품은 최소 입찰가 기준으로 입찰이 진행됩니다.
    - 마감 시간까지 입찰 가능하며, 입찰가는 가격 → 수량 순으로 낙찰이 결정됩니다.
    - 낙찰 결과는 마이페이지에서 확인할 수 있습니다.

- **결제**:
  - 카카오페이로 결제가 가능합니다.

- **마이페이지**:
    - 프로필 수정, 농장 개설 및 수정이 가능합니다.
    - 주문 내역, 후기, 문의 내역, 경매 참여 내역 등 다양한 활동 기록을 조회할 수 있습니다.

- **판매자 페이지**:
    - 농장에 달린 문의에 대한 답변이 가능합니다.
    - 배송 상품의 송장 번호 등록 및 배송 상태 관리 기능을 제공합니다.

      <br/>
      <br/>

# 4. Tasks & Responsibilities (작업 및 역할 분담)
|        |                                                                                                                   |                                                                                                                                                                                                                                                                                                 |
|--------|-------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 김현수    | <img src="https://github.com/user-attachments/assets/af16adf8-5ef7-4c46-8316-375571920f3c" alt="김현수" width="100"> | <ul><li>프론트엔드 단독 담당</li><li>카카오 로그인 연동 구현</li><li>농장 개설, 수정, 삭제 및 지도 마커 연동</li><li>일반 상품 등록/수정/삭제/검색 기능 구현</li><li>공동구매 상품 등록 및 구매 로직 구현</li><li>경매 상품 등록 및 입찰/낙찰 구현</li><li>카카오페이 결제 구현</li><li>마이페이지 내 프로필, 주문/후기/문의/경매 내역 조회 기능 구현</li><li>판매자 페이지 내 문의 답변, 송장 등록 및 배송 상태 관리 기능 구현</li></ul> |



<br/>
<br/>

# 5. Technology Stack (기술 스택)
## 5.1 Language
|  |  |
|-----------------|-----------------|
| HTML5    |<img src="https://github.com/user-attachments/assets/2e122e74-a28b-4ce7-aff6-382959216d31" alt="HTML5" width="100">| 
| CSS3    |   <img src="https://github.com/user-attachments/assets/c531b03d-55a3-40bf-9195-9ff8c4688f13" alt="CSS3" width="100">|
| Javascript    |  <img src="https://github.com/user-attachments/assets/4a7d7074-8c71-48b4-8652-7431477669d1" alt="Javascript" width="100"> | 

<br/>

## 5.2 Frotend
|  |  |  |
|-----------------|-----------------|-----------------|
| React    |  <img src="https://github.com/user-attachments/assets/e3b49dbb-981b-4804-acf9-012c854a2fd2" alt="React" width="100"> | 18.3.1    |

<br/>

## 5.3 Backend
|            |                                                                                                                          |  |
|------------|--------------------------------------------------------------------------------------------------------------------------|-----------------|
| SpringBoot | <img src="https://github.com/user-attachments/assets/e24e22e6-e97e-4f0d-9a4e-84f6913d8cdf" alt="SpringBoot" width="100"> | 10.12.5    |

<br/>

## 5.4 Cooperation
|        |  |
|--------|-----------------|
| Git    |  <img src="https://github.com/user-attachments/assets/483abc38-ed4d-487c-b43a-3963b33430e6" alt="git" width="100">    |
| Figma  |  <img src="https://github.com/user-attachments/assets/4d8de586-737c-4312-b746-8ba5880fed96" alt="git kraken" width="100">    |
| Notion |  <img src="https://github.com/user-attachments/assets/34141eb9-deca-416a-a83f-ff9543cc2f9a" alt="Notion" width="100">    |

<br/>

# 6. Project Structure (프로젝트 구조)
```plaintext
project/
├── public/
│   ├── index.html            # HTML 템플릿 파일
│   └── favicon_Logo.ico      # 파비콘 아이콘 파일
├── src/
│   ├── api/                  # API 요청 및 관련 함수 모음
│   ├── component/            # 재사용 가능한 UI 컴포넌트
│   ├── constant/             # 전역 상수 및 스타일 정의
│   ├── context/              # 전역 상태 관리(Context API) 관련 파일
│   ├── images/               # 이미지 파일 모음
│   ├── pages/                # 각 페이지별 컴포넌트
│   ├── util/                 # 유틸리티 함수 모음
│   ├── App.css               # App 컴포넌트 전용 스타일 파일
│   ├── App.js                # 메인 애플리케이션 컴포넌트
│   ├── config.js             # 환경 설정 및 공통 설정 파일
│   ├── index.js              # 애플리케이션 진입점(엔트리 포인트)
│   ├── index.css             # 전체 앱에 적용되는 전역 스타일
│   ├── setupProxy.js         # 프록시 설정 파일(API 요청 우회용)
├── .env                      # 환경 변수 설정 파일
├── package-lock.json         # 설치된 의존성의 정확한 버전 기록
├── package.json              # 프로젝트 메타 정보 및 의존성 정의
├── .gitignore                # Git에서 무시할 파일/폴더 목록
├── Dockerfile                # Docker 이미지 생성을 위한 설정 파일
└── README.md                 # 프로젝트 소개 및 사용법 문서
```

<br/>
<br/>


# 7. 커밋 컨벤션

## type 종류
```
feat : 새로운 기능 추가
fix : 버그 수정
docs : 문서 수정
style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
refactor : 코드 리펙토링
test : 테스트 코드, 리펙토링 테스트 코드 추가
chore : 빌드 업무 수정, 패키지 매니저 수정
```

<br/>
<br/>