import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import styles from "../../../styles/Home.module.css";
import { getApiClient } from "../../rest/client";
import { TodoList } from "../../rest/schema/todo";

type Props = {
  name: string;
  todos: TodoList;
};

const Home: NextPage<Props> = ({ name, todos }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>User Todo page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>{name}</h1>
        {todos.map((todo) => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  params,
}) => {
  const user = await getApiClient().getUser({
    params: { id: Number(params?.id) || 1 },
  });
  const todos = await getApiClient().getTodo();
  return { props: { name: user.name, todos } };
};

export default Home;
