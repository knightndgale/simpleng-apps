import { useRouter } from "next/router";

const Content: React.FC = () => {
  const router = useRouter();
  return (
    <div className="hero mt-40">
      <div className="hero-content text-center ">
        <div className="w-9/12">
          <h1 className="mb-5 text-5xl font-bold text-primary">
            Welcome to Simpleng Apps!
          </h1>
          <p className="mb-20  text-secondary-content">
            Ready to enter the exciting world of web apps? Look no further than
            our collection of{" "}
            <span className="font-semibold">
              {" "}
              NextJs, Prisma, Postgresql, useQuery, and Redux-powered{" "}
            </span>{" "}
            creations! Curated by{" "}
            <span className="font-semibold">
              {" "}
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
    </div>
  );
};

export default Content;