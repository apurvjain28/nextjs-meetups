// www.our-domain/

//import { useEffect, useState } from "react";
import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_DATA = [
//   {
//     id: "m1",
//     title: "My First meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",
//     address: "1511-103 Weslodge MKTE13",
//     description: "First meetup in Paris",
//   },
//   {
//     id: "m2",
//     title: "My Second meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",
//     address: "1806-103 Rochevelle M1TEw1",
//     description: "Second meetup in Milam",
//   },
// ];

function HomePage(props) {
  // const [loadedmeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // fetch data from url
  //   setLoadedMeetups(DUMMY_DATA);
  // });

  return (
    <Fragment>
      <Head>
        <title>Next.js App</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   // can check for authentication here
//   const res = context.res;
//   // fetch data from an API

//   return {
//     props: { meetups: DUMMY_DATA },
//   };
// }
export async function getStaticProps() {
  // fetch data from an API
  console.log();

  const client = await MongoClient.connect(
    process.env.MONGODB_CONNECTION_STRING
  );
  const db = client.db();

  //table
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
