import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Form from "@/components/templates/contact-us/Form";
import Information from "@/components/templates/contact-us/Information";
// import Map from "@/components/templates/contact-us/Map";
import styles from "@/styles/contact-us.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/templates/contact-us/Map"), {
  ssr: false,
});

const page = async () => {
  return (
    <>
      <div className="container">
        <Breadcrumb route={"تماس با ما"} />
        <div className="p-6 text-right">
          <main className={styles.maps}>
            <section className=" relative z-0 ">
              <Map
                position={[34.662848, 50.909259]}
                center={[34.662848, 50.909259]}
              >
                <span> فروشگاه ما</span>
                <h3>آدرس فروشگاه حضوری قهوه ست (شعبه جم)</h3>
                <p>
                  تهران – خ کریمخان زند – خ قائم مقام فراهانی – ابتدای خ فجر(جم)
                  – شماره ۱۰
                </p>
                <p>021-88305827</p>
                <Link href="/about-us">درباره فروشگاه</Link>
              </Map>
            </section>
            <section className="relative z-0">
              <Map
                position={[36.652716, 51.503189]}
                center={[36.652716, 51.503189]}
              >
                <span> کارخانه ما</span>
                <h3>آدرس کارخانه حضوری قهوه ست (شعبه جم)</h3>
                <p>
                  تهران – خ کریمخان زند – خ قائم مقام فراهانی – ابتدای خ فجر(جم)
                  – شماره ۱۰
                </p>
                <p>021-88305827</p>
                <Link href="/about-us">درباره کارخانه</Link>
              </Map>
            </section>
          </main>
        </div>

        <div className="p-6 text-right ">
          <div className={styles.contents}>
            <Form />
            <Information />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
