import { useRouter } from "next/router";

const Home: React.FC = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center py-20">
      <div className=" flex-col justify-center self-center text-center sm:w-9/12">
        <h1 className="mb-5 text-4xl font-bold  md:text-5xl lg:text-6xl">
          Welcome to Simpleng Apps!
        </h1>
        <p className="mb-16 text-sm md:text-base lg:text-lg ">
          Ready to enter the exciting world of web apps? Look no further than
          our collection of{" "}
          <span className="font-semibold">
            NextJs, Prisma, Postgresql, useQuery, and Redux-powered
          </span>{" "}
          creations! Curated by{" "}
          <span className="font-semibold">
            Mark Dave Soriano and the Innoendo IT Solutions team
          </span>
          , our web apps are the perfect blend of fun and functionality. Come
          explore the possibilities and join us on this wild web adventure!
        </p>
        <button
          className="btn-primary btn"
          onClick={() => void router.push("/robofriends")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
