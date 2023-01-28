import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { PostData } from "../../lib/types";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData: PostData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

type Props = {
  postData: PostData;
};

const Post: React.FC<Props> = ({ postData }) => {
  return (
    <Layout>
      <>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            {/* <Date dateString={postData.date} /> */}
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contents }} />
        </article>
      </>
    </Layout>
  );
};

export default Post;
