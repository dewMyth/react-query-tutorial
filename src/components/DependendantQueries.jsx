import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const fetchUser = async (email) => {
  return axios.get(`http://localhost:4000/users?email=${email}`);
};

const fetchCoursesByChannelId = async (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`);
};

const DependendantQueries = ({ email }) => {
  const { data: user } = useQuery(["user", email], () => fetchUser(email));
  const channelId = user?.data[0].channelId;

  const { data: courses } = useQuery(
    ["courses", channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId, // only run if channelId is truthy -> making a channelId a boolean
    }
  );

  return <div>{JSON.stringify(courses.data.courses)}</div>;
};

export default DependendantQueries;
