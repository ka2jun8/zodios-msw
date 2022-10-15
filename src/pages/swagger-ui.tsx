import { toOpenApi } from "@zodios/openapi";
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";
import { todoApi } from "../rest/schema/todo";
import { userApi } from "../rest/schema/user";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

const SwaggerApp: NextPage<{ spec: any }> = ({ spec }) => {
  return <SwaggerUI spec={spec} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const document = toOpenApi([...userApi, ...todoApi], {
    info: {
      title: "Zodios OpenAPI Samples",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000/api/msw/",
      },
    ],
  });

  // undefined になる property 排除のため
  const spec = JSON.parse(JSON.stringify(document));

  return {
    props: {
      spec,
    },
  };
};

export default SwaggerApp;
