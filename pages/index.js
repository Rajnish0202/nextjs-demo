import Head from "next/head";

// import { useState, useEffect } from "react";

import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80",
//     address: "Somewhere far from here",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80",
//     address: "Somewhere far far away from home",
//   },
// ];

function HomePage(props) {
  // =========================================================================

  // with getStaticProps function or Static Generation we don't need useState and useEffect

  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // send a http request and fetch data

  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  // return <MeetupList meetups={loadedMeetups} />;

  // =========================================================================

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active react meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// =============================================================================
// Pre-Rendering form first- Static Generation. it always be used in main index.js file

// ==========================================================================
export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect(
    "mongodb+srv://rajnish0202:rajnish@cluster0.tp1ac.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetup");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        // description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
  };

  // return {
  //   props: {
  //     meetups: DUMMY_MEETUPS,
  //   },
  //   // when our data uploaded is become outdated then this revalidate is use to upload new one in static generation pre-rendering and 10 shows that the page is genrated on the server if there are request coming every 10sec then this generated page replace the old pre-generated page
  //   revalidate: 10,
  // };
}
// ============================================================================

// ============================================================================
// Alternative of above but it is not great choice bcoz here page is not refresh frequantly

// export async function getStaticProps(context) {
//   const req = context.req;
//   const res = context.res;

//   //   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// ============================================================================

// ==============================================================================

export default HomePage;
