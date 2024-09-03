import { GetServerSideProps } from 'next';
import { FC } from 'react';

interface IProps {
  length: number;
}

const VideosPage: FC<IProps> = ({ length }) => {
  return (
    <div>
      <h1>User Videos</h1>
      <p>Total videos: {length}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { length } = context.query;

  return {
    props: {
      length: length ? parseInt(length as string, 10) : 0,
    },
  };
};

export default VideosPage;
