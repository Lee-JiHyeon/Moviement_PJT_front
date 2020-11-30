# README

> 최종프로젝트 
>
> 영화 커뮤니티 사이트 구현



### 팀원&업무분담내역

- 김동욱/팀장/**백엔드**/프론트엔드

  ```select a language
  - ERD 설계, 데이터베이스 파싱 (DB담당)
  - 초기 Vue 레이아웃 구현
  - Vue로 리뷰, 댓글, 한줄평별점 CRUD 구현
  - Youtube트레일러 구현
  - 페이지네이션 기능 구현
  - api 구현
  => DB와 주요 CRUD 기능을 구현해주셨다.
  ```

- 이지현/팀원/프론트엔드(+백엔드 조금)

  ```select a language
  - UI설계
  - 회원가입/로그인/로그아웃기능 구현
  - 검색창 기능 구현
  - follow 기능 구현
  - 추천알고리즘 기능 구현
  - CSS 스타일링
  => CRUD를 제외한 기타 기능과 CSS 스타일링, 배치를 담당하였다.
  ```

- 트렐로 사진

  ![](README.assets/final_project%20trello.jpg)

### 목표 서비스 구현 및 실제 구현 정도

- 프로젝트 초반 구현 목표

  - 기능면

  ```select a language
  1. 검색창기능
  2. 팔로우기능 & 마이페이지(프로필기능)
  3. 영화예고편
  4. 별점과 한줄평 출력
  ```

  - 화면설계

    ![](README.assets/%ED%99%94%EB%A9%B4%EC%84%A4%EA%B3%84.jpg)



### 데이터베이스 모델링(ERD)

> TMDB API 사용



### 필수기능에 대한 설명

![](README.assets/1-1606716584243.jpg)

1. 검색창

   ```select a language
   <v-autocomplete>를 활용하여 검색창기능을 구현하였다.
   검색할 영화를 고르면 디테일 페이지로 이동할 수 있게 구현하였다.
   ```

2. 인기영화

   ```
   popularity순으로 영화를 <v-card>에 출력하였다.
   ```

3. 최신영화

   ```
   "2020-07-01", "2020-12-31" 개봉일 범위 중 최신순으로 <v-card>에 출력하였다. 
   ```

4. 추천알고리즘

   ```
   사용자가 원하는 장르는 담아서(10개씩) <v-card>에 출력하였다. 
   ```

   ![](README.assets/%EB%B3%84%EC%A0%90%EC%A3%BC%EA%B8%B0.jpg)

   ![](README.assets/%EC%98%81%ED%99%94%EC%98%88%EA%B3%A0%ED%8E%B8-1606717005479.jpg)

5. (디테일)별점&한줄평 작성 , 영화예고편

   ```
   영화디테일 페이지에서 별점과 함께 한줄평을 남길 수 있습니다.
   회원들이 남긴 별점은 평균을 내어서 영화디테일 페이지에 바로 출력합니다.
   하나의 영화에 한개의 별점과 한줄평을 남길 수 있습니다.
   수정, 삭제 가능합니다.
   -----------------------------------------------------------
   영화예고편이 해당화면에서 재생됩니다.
   ```

   ![](README.assets/%EC%98%81%ED%99%94%EB%A6%AC%EB%B7%B0%EB%A6%AC%EC%8A%A4%ED%8A%B8.jpg)

   ![](README.assets/%EB%A6%AC%EB%B7%B0%EC%9E%91%EC%84%B1.jpg)

   ![](README.assets/%EB%A6%AC%EB%B7%B0%EB%94%94%ED%85%8C%EC%9D%BC.jpg)

6. 리뷰작성하기 & 리뷰디테일

   ```
   작성폼에서 리뷰를 작성할 영화를 선택할 수 있습니다.
   ------------------------------------------
   리뷰디테일에서 영화명을 누르면 해당영화 디테일페이지로 이동합니다.
   리뷰 작성자 아이디를 누르면 해당유저의 페이지로 이동합니다.(팔로우가 가능하고 해당유저가 작성한 리뷰리스트를 볼 수 있습니다.)
   좋아요버튼 기능이 있습니다.
   댓글 작성 및 수정 그리고 댓글목록을 확인할 수 있습니다.
   ```

   ![](README.assets/%ED%94%84%EB%A1%9C%ED%95%84.jpg)

   ![](README.assets/%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80.jpg)

7. Mypage & 팔로우 

   ```
   (현재 나 => test3, 다른유저 => jh1004)
   Mypage에서 게시글, 팔로워, 팔로잉 수를 알 수 있습니다.
   리뷰리스트 목록에서 제목을 클릭하면 해당 리뷰 디테일 페이지로 이동할 수 있습니다.
   ```

   

### 느낀점

```
짧은 시간이라 더 완벽한 구현을 못한게 아쉽다.
예를들면 팔로워, 팔로잉 유저들의 목록을 출력하거나, 등록한 별점정보도 추천알고리즘에 포함하는 것, 검색창에서 줄거리나 배우이름으로 영화검색 기능 등 아쉬운 부분이 많다.
Vue를 더 잘해보고싶은 욕심에 Vue를 이용했지만 너무 힘들었다. 힘든만큼 배운 것도 정말 많다.
페어덕분에 기능구현도 무사히 끝낼 수 있었다. 스스로 생각하기에 페어에게 도움이 많이 못되어 준 것 같아 미안한 마음이다..
12월에도 Mysql이나(DB가 든든하니 좋았다) vue를 더 공부해서 더 좋은 프로젝트 결과물을 만들고 싶다.
이번 프로젝트 동안 페어인 동욱님이 있어 많이 든든하였다. 나도 누군가에게 든든한 팀원이 될 수 있도록 실력을 많이 쌓고 더 노력해야겠다.
밤새느라 힘들었지만 완성되어가는 홈페이지 모습에 뿌듯하고 재밌었다.
그리고 스스로 부족한 점도 돌아보고 새롭게 배운점도 많아 값진 경험이였다.
```

