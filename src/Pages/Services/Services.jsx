import React, { useContext } from "react";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Socials from "../../Components/Socials/Socials";
import Footer from "../../Components/Footer/Footer";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import AuthContext from "../../Context/AuthContext";
import GameBox from "../../Components/GameBox/GameBox";
import Benefits from "../../Components/Benefits/Benefits";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./Services.css";

export default function Services() {
  const contextData = useContext(AuthContext);
  return (
    <>
      <Topbar />
      <Navbar />
      <div className="container">
        <SectionHeader title="خدمات" custom="accessory-header"/>
        <p className="services__info">
          درباره خدمات: لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
          چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و
          مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
          نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای
          زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان
          را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
          الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت
          می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت
          تایپ به پایان رسد وزمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و
          جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار
          گیرد.
        </p>

        <SectionHeader title="اکانت ها" />

        <div className="games__box-container">
          {contextData.allaccounts.map((account) => (
            <GameBox
              key={account.id}
              custom="accounts__box-custom services__custom-box"
              link={account.link ? account.link : null}
              title={account.title}
              src={account.src}
              off={account.off}
              price={account.price}
              clickHandler={() => contextData.addToBasket(account)}
            />
          ))}
        </div>
      </div>

      <Benefits background={false} custom="games__benefits" />

      <div className="container">
        <div className="gift-cards__other-products">
          <SectionHeader title="دیگر محصولات" />
          <Swiper
            modules={[Pagination, Autoplay]}
            autoplay={true}
            pagination={{ type: "bullets", clickable: true }}
            className="mySwiper"
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
              1400: {
                slidesPerView: 4,
              },
            }}
          >
            {contextData.allSoftwares?.length
              ? contextData.allSoftwares.slice(0, 8).map((game) => (
                  <SwiperSlide key={game.id}>
                    <GameBox
                      clickHandler={() => contextData.addToBasket(game)}
                      src={game.src}
                      title={game.title}
                      price={game.price}
                      off={game.off}
                      link={game.link}
                    />
                  </SwiperSlide>
                ))
              : ""}
          </Swiper>
        </div>
      </div>
      <Socials />
      <Footer />
    </>
  );
}
