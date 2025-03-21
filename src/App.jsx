import "./App.css";
import { useRoutes, useNavigate } from "react-router-dom";
import routes from "./routes";
import AuthContext from "./Context/AuthContext";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import PN from "persian-number";

function App() {
  const navigate = useNavigate();
  const [allUsers, setAllUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState({});
  const [userBasket, setUserBasket] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [userPays, setUserPays] = useState([]);
  const [userTickets, setUserTickets] = useState([]);
  const [userNotifications, setUserNotifications] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [allGamesData, setAllGamesData] = useState([]);
  const [allaccounts, setAllaccounts] = useState([]);
  const [giftsCategory, setGiftsCategory] = useState([]);
  const [allGifts, setAllGifts] = useState([]);
  const [allSoftwares, setAllSoftwares] = useState([]);
  const [allAccessories, setAllAccessories] = useState([]);
  const [allMoney, setAllMoney] = useState([]);
  const [articles, setArticles] = useState([]);
  const back_url = "https://back.nima-ranjbar.ir/";
  useEffect(() => {
    fetch(`${back_url}users`)
      .then((res) => res.json())
      .then((data) => setAllUser(data));

    fetch(`${back_url}games`)
      .then((res) => res.json())
      .then((data) => setAllGamesData(data));

    fetch(`${back_url}accounts`)
      .then((res) => res.json())
      .then((data) => setAllaccounts(data));

    fetch(`${back_url}gifts`)
      .then((res) => res.json())
      .then((data) => setGiftsCategory(data));

    fetch(`${back_url}softwares`)
      .then((res) => res.json())
      .then((data) => setAllSoftwares(data));

    fetch(`${back_url}digits`)
      .then((res) => res.json())
      .then((data) => setAllAccessories(data));

    fetch(`${back_url}money`)
      .then((res) => res.json())
      .then((data) => setAllMoney(data));

    fetch(`${back_url}articles`)
      .then((res) => res.json())
      .then((allArticles) => setArticles(allArticles));
  }, []);

  useEffect(() => {
    const giftCards = [];
    giftsCategory.forEach((gift) => {
      gift.giftCards.forEach((eachGift, index) => {
        if (index <= 1) {
          giftCards.push(eachGift);
        }
      });
    });
    setAllGifts(giftCards);
  }, [giftsCategory]);

  const setData = (data, filterKry) => {
    const category = data.filter((game) => game.category === filterKry);
    return category;
  };

  const login = (userData, token) => {
    setIsLoggedIn(true);
    setUserInfos(userData);
    localStorage.setItem("user", JSON.stringify({ token }));
  };

  const logout = () => {
    Swal.fire({
      title: "شما در حال خروج از حساب کاربری خود هستید. ادامه می دهید ؟",
      icon: "warning",
      iconColor: "#Fd295c",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "خیر",
      confirmButtonText: "بله،‌خارج می شوم",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "شما از حساب کاربری خود خارج شدید",
          confirmButtonColor: "#Fd295c",
          icon: "success",
          iconColor: "#Fd295c",
        }).then(() => {
          setIsLoggedIn(false);
          setToken(null);
          localStorage.removeItem("user");
        });
      }
    });
  };

  const addToBasket = (datas) => {
    if (isLoggedIn) {
      const isProduct = userBasket.find((data) => data.title === datas.title);

      if (isProduct) {
        Swal.fire({
          title: "این محصول در سبد خرید شما موجود است",
          text: "در صورت تمایل، میتوانید در سبد خرید تعداد آن را افزایش دهید",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "رفتن به سبد خرید",
          cancelButtonText: "ادامه دادن در همین صفحه",
          cancelButtonColor: "#Fd295c",
          iconColor: "#Fd295c",
          confirmButtonColor: "",
        }).then((answer) => {
          if (answer.isConfirmed) {
            navigate("/carts");
          }
        });
      } else {
        const product = { ...datas };
        if (product.off) {
          product.price = product.price - (product.price * product.off) / 100;
        }
        const newProducts = { ...product };
        const random = `${Math.floor(Math.random() * 10000)}${Math.floor(
          Math.random() * 10000
        )}`;
        newProducts.id = `z${random}`;

        const newBasket = [...userBasket, { ...newProducts, count: 1 }];

        Swal.fire({
          title: `${datas.title} را به سبد خرید اضافه میکنید؟`,
          icon: "question",
          confirmButtonText: "بله",
          cancelButtonText: "خیر",
          showCancelButton: true,
          showCloseButton: true,
          iconColor: "#Fd295c",
          cancelButtonColor: "#Fd295c",
        }).then((answer) => {
          if (answer.isConfirmed) {
            fetch(`${back_url}users/${userInfos.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ basket: newBasket }),
            }).then((res) => {
              if (res.ok) {
                Swal.fire({
                  title: `${datas.title} به سبد خرید شما اضافه شد`,
                  icon: "success",
                  iconColor: "#Fd295c",
                  confirmButtonColor: "#Fd295c",
                }).then(() => {
                  fetch(`${back_url}users`)
                    .then((res) => res.json())
                    .then((data) => {
                      setAllUser(data);
                    });
                });
              }
            });
          }
        });
      }
    } else {
      Swal.fire({
        title: "لطفا وارد حساب کاربری خود شوید",
        icon: "error",
        iconColor: "#Fd295c",
        confirmButtonColor: "#Fd295c",
      }).then(() => {
        navigate("/login");
      });
    }
  };

  const removeFromBasket = (id, title) => {
    Swal.fire({
      title: `میخواهید ${title} را از سبد خرید حذف کنید؟`,
      icon: "question",
      confirmButtonText: "بله",
      cancelButtonText: "انصراف",
      showCancelButton: true,
      showCloseButton: true,
      iconColor: "#Fd295c",
      cancelButtonColor: "#Fd295c",
    }).then((answer) => {
      if (answer.isConfirmed) {
        const newBasket = [...userBasket].filter((basket) => basket.id !== id);

        fetch(`${back_url}users/${userInfos.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ basket: newBasket }),
        }).then((res) => {
          if (res.ok) {
            Swal.fire({
              title: `${title} با موفقیت از سبد خرید حذف شد`,
              icon: "success",
              iconColor: "#Fd295c",
              confirmButtonColor: "#Fd295c",
            }).then(() => {
              fetch(`${back_url}users`)
                .then((res) => res.json())
                .then((data) => {
                  setAllUser(data);
                });
            });
          }
        });
      }
    });
  };

  const addCount = (id) => {
    const product = userBasket.map((item) => {
      if (item.id === id) {
        item.count += 1;
      }
      return item;
    });

    fetch(`${back_url}users/${userInfos.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ basket: product }),
    })
      .then((res) => {
        if (res.ok) {
          res.json();
        }
      })
      .then((data) => {
        fetch(`${back_url}users`)
          .then((res) => res.json())
          .then((data) => {
            setAllUser(data);
          });
      });
  };

  const minusCount = (id) => {
    const product = userBasket.map((item) => {
      if (item.id === id) {
        item.count -= 1;
      }
      return item;
    });

    fetch(`${back_url}users/${userInfos.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ basket: product }),
    })
      .then((res) => {
        if (res.ok) {
          res.json();
        }
      })
      .then((data) => {
        fetch(`${back_url}users`)
          .then((res) => res.json())
          .then((data) => {
            setAllUser(data);
          });
      });
  };

  const chargeBalance = (amount, portal) => {
    Swal.fire({
      title: `شما در حال واریز مبلغ ${amount.toLocaleString()} به کیف پول خود هستید`,
      text: "آیا ادامه می دهید؟",
      icon: "question",
      confirmButtonText: "بله",
      cancelButtonText: "انصراف",
      showCancelButton: true,
      showCloseButton: true,
      iconColor: "#Fd295c",
      cancelButtonColor: "#Fd295c",
    }).then((answer) => {
      if (answer.isConfirmed) {
        const date = new Date().toLocaleDateString("fa-IR");
        const newPays = [
          ...userPays,
          {
            id:
              Math.ceil(Math.random() * 100000) +
              Math.ceil(Math.random() * 10000) +
              Math.ceil(Math.random() * 1000),
            date,
            amount,
            portal,
            transaction: "شارژ کیف پول",
          },
        ];
        fetch(`${back_url}users/${userInfos.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            balance: amount + accountBalance,
            pays: newPays,
          }),
        })
          .then((res) => {
            if (res.ok) {
              res.json();
            }
          })
          .then((data) => {
            fetch(`${back_url}users`)
              .then((res) => res.json())
              .then((data) => {
                Swal.fire({
                  title: `کیف پول شما به مبلغ ${amount.toLocaleString()} شارژ شد.`,
                  showConfirmButton: true,
                  confirmButtonColor: "#Fd295c",
                }).then(() => {
                  setAllUser(data);
                });
              });
          });
      }
    });
  };

  const payHandler = () => {
    if (accountBalance >= totalPrice) {
      Swal.fire({
        title: `شما در حال پرداخت مبلغ ${PN.convertEnToPe(
          totalPrice.toLocaleString()
        )} تومان از کیف پول خود هستید. ادامه می دهید؟`,
        icon: "question",
        confirmButtonText: "بله",
        cancelButtonText: "انصراف",
        showCancelButton: true,
        showCloseButton: true,
        iconColor: "#Fd295c",
        cancelButtonColor: "#Fd295c",
      }).then((answer) => {
        if (answer.isConfirmed) {
          const newBallance = accountBalance - totalPrice;
          const date = new Date().toLocaleDateString("fa-IR");
          const hours = new Date().getHours();
          const minutes = new Date().getMinutes();
          const random = `#${Math.ceil(Math.random() * 1000)}${Math.ceil(
            Math.random() * 1000
          )}${Math.ceil(Math.random() * 1000)}`;
          const random1 = `#${Math.ceil(Math.random() * 1000)}${Math.ceil(
            Math.random() * 1000
          )}`;
          const newPays = [
            ...userPays,
            {
              id: `p${
                Math.ceil(Math.random() * 100000) +
                Math.ceil(Math.random() * 10000) +
                Math.ceil(Math.random() * 1000)
              }`,
              date,
              amount: totalPrice,
              portal: `Order ${random}`,
              transaction: "برداشت از کیف پول",
            },
          ];
          if (userBasket.length >= 2) {
            userBasket.map((basket) => {
              return (
                (basket.payNumber = random),
                (basket.totalPay = totalPrice),
                (basket.orderNumber = random1),
                (basket.date = date),
                (basket.hours = hours),
                (basket.minutes = minutes)
              );
            });
          } else {
            userBasket[0].payNumber = random;
            userBasket[0].date = date;
            userBasket[0].hours = hours;
            userBasket[0].minutes = minutes;
          }

          const newOrders =
            userBasket.length >= 2
              ? [...userOrders, [...userBasket]]
              : [...userOrders, ...userBasket];

          fetch(`${back_url}users/${userInfos.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orders: newOrders,
              balance: newBallance,
              basket: [],
              pays: newPays,
            }),
          })
            .then((res) => {
              if (res.ok) {
                res.json();
              }
            })
            .then((data) => {
              fetch(`${back_url}users`)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    title: "خرید شما با موفقیت انجام شد",
                    showConfirmButton: true,
                    confirmButtonColor: "#Fd295c",
                  }).then(() => {
                    setAllUser(data);
                  });
                });
            });
        }
      });
    } else {
      Swal.fire({
        title: "موجودی کیف پول شما برای پرداخت کافی نمی باشد",
        text: "لطفا موجودی کیف پول خود را از پنل کاربری افزایش دهید",
        confirmButtonColor: "#Fd295c",
        icon: "warning",
        iconColor: "#Fd295c",
      });
    }
  };

  const sendComments = (blogID, comments) => {
    Swal.fire({
      title: "شما در حال ثبت نظر هستید. ادامه می دهید؟",
      icon: "question",
      confirmButtonText: "بله",
      cancelButtonText: "انصراف",
      showCancelButton: true,
      showCloseButton: true,
      iconColor: "#Fd295c",
      cancelButtonColor: "#Fd295c",
    }).then((answer) => {
      if (answer.isConfirmed) {
        fetch(`${back_url}articles/${blogID}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            comments,
          }),
        }).then((res) => {
          if (res.ok) {
            Swal.fire({
              title:
                "نظر شما با موفقیت ثبت شد و بعد از تایید ادمین سایت نمایش داده می شود",
              icon: "success",
              iconColor: "#Fd295c",
              confirmButtonColor: "#Fd295c",
            }).then(() => {
              fetch(`${back_url}articles`)
                .then((res) => res.json())
                .then((allArticles) => setArticles(allArticles));
            });
          }
        });
      }
    });
  };

  const changePassword = (values) => {
    if (values.password === userInfos.password) {
      Swal.fire({
        title: `شما در حال تغییر رمز عبور حساب کاربری خود هستید`,
        text: "آیا ادامه می دهید؟",
        icon: "question",
        confirmButtonText: "بله",
        cancelButtonText: "انصراف",
        showCancelButton: true,
        showCloseButton: true,
        iconColor: "#Fd295c",
        cancelButtonColor: "#Fd295c",
      }).then((answer) => {
        console.log(values);
        
        if (answer.isConfirmed) {
          fetch(`${back_url}users/${userInfos.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              password: values.newPassword,
            }),
          })
            .then((res) => {
              if (res.ok) {
                res.json();
              }
            })
            .then((data) => {
              fetch(`${back_url}users`)
                .then((res) => res.json())
                .then((data) => {
                  Swal.fire({
                    title: `رمز عبور شما با موفقیت تغییر یافت.`,
                    showConfirmButton: true,
                    icon: "success",
                    confirmButtonColor: "#Fd295c",
                    iconColor: "#fd295c",
                  }).then(() => {
                    setAllUser(data);
                  });
                });
            });
        }
      });
    } else {
      Swal.fire({
        title: `رمز عبور فعلی شما اشتباه است.`,
        text: "لطفا رمز عبور را اصلاح کرده و مجددا تلاش کنید",
        showConfirmButton: true,
        icon: "error",
        confirmButtonColor: "#Fd295c",
        iconColor: "#fd295c",
      });
    }
  };

  useEffect(() => {
    const localStorageinfo = JSON.parse(localStorage.getItem("user"));
    if (localStorageinfo) {
      const userData = allUsers.find(
        (user) => user.token === localStorageinfo.token
      );
      setUserInfos(userData);
      setIsLoggedIn(true);
    }
  }, [allUsers]);

  useEffect(() => {
    if (userInfos) {
      if (Object.hasOwn(userInfos, "basket")) {
        setUserBasket(userInfos.basket);
        setAccountBalance(userInfos.balance);
      }
      setUserOrders(userInfos.orders);
      setUserPays(userInfos.pays);
      setUserTickets(userInfos.tickets);
      setUserNotifications(userInfos.notifications);
    }
  }, [userInfos]);

  useEffect(() => {
    const total = userBasket.reduce((prev, curr) => {
      return prev + curr.price * curr.count;
    }, 0);

    setTotalPrice(total);
  }, [userBasket]);

  const router = useRoutes(routes);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
        allUsers,
        addToBasket,
        userBasket,
        totalPrice,
        addCount,
        minusCount,
        removeFromBasket,
        accountBalance,
        chargeBalance,
        allGamesData,
        allaccounts,
        allGifts,
        giftsCategory,
        setData,
        allSoftwares,
        allAccessories,
        allMoney,
        payHandler,
        userPays,
        userOrders,
        userTickets,
        userNotifications,
        articles,
        sendComments,
        changePassword,
        back_url,
      }}
    >
      <div className="App">{router}</div>
    </AuthContext.Provider>
  );
}

export default App;
