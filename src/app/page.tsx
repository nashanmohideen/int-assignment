import Header from "./components/header";
import Footer from "./components/footer";
import Banner from "./components/banner";
import Text from "./components/text";
import Carousel from "./components/carousel";
import Image from "next/image";

const imageUrls = [
  "https://img.freepik.com/free-photo/elephant-walking-road_181624-23124.jpg?t=st=1722866581~exp=1722870181~hmac=51d8113a87e95d30d815a14cb517f0a259b4b1d33ae83cca34a82ba2d8ac0b55&w=900",
  "https://img.freepik.com/free-photo/closeup-shot-elephants-standing-near-lake-sunset_181624-29375.jpg?t=st=1722866636~exp=1722870236~hmac=fab78616be537994db2c39dcd80e66853b6378531bcc1e4b96644d4eb6d3aaf4&w=900",
  "https://img.freepik.com/free-photo/group-giraffes-standing-grass-covered-hill-near-trees_181624-26603.jpg?t=st=1722866695~exp=1722870295~hmac=5e38539488234cad5395b937ef8df63925f7b9e828fe9ac6e0fb3552d0102198&w=900",
];

const slides = imageUrls.map((url, index) => (
  <Image
    key={index}
    src={url}
    alt="image"
    width={200}
    height={200}
    className="rounded-r-lg rounded-l-sm p-3 object-center"
  />
));

export default function Home() {
  return (
    <div className="md:w-full">
      <Header />
      <main className="flex flex-col items-center gap-2 md:p-3 lg:p-3">
        <Banner />
        <Text text="Text 1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et sequi,
          porro recusandae ea iste aliquam soluta, aliquid molestiae possimus
          impedit enim deserunt, libero nihil facere a numquam minus dolorem
          unde!
        </Text>
        <div className="hidden md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 w-[700px] h-[200px] items-center rounded-lg gap-2 bg-gray-800 p-3 ">
          {slides}
        </div>
        <Carousel slides={slides} />
        <Text text="Text 2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
          similique quis sint. Doloribus, obcaecati laborum neque, dicta
          architecto eius totam illum sunt consequatur, vel possimus in
          exercitationem praesentium amet atque.
        </Text>
        <div className="w-full p-3 text-left m-2  md:hidden lg:hidden">
          <h3>
            <b>Note:</b>
          </h3>
          <p className="sm:text-xs text-left ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            voluptatum in laborum optio reprehenderit tempore, enim minus aut
            incidunt expedita praesentium accusantium sunt neque exercitationem
            veniam illo doloremque laboriosam quos!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
