import { useRouter } from "next/navigation";

const logoutHandler = () => {
  const router = useRouter();
  swal({
    title: "آیا از خروج اطمینان دارید؟",
    icon: "warning",
    buttons: ["نه", "آره"],
  }).then(async (result) => {
    if (result) {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      if (res.status === 200) {
        swal({
          title: "شما با موفقیت از حساب کاربری خود خارج شدید.",
          icon: "warning",
          buttons: "متوجه شدم",
        }).then(() => {
          router.replace("/home");
        });
      }
    }
  });
};

export default logoutHandler;
