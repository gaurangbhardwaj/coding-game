import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";

const leaderboardData: any[] = [
  {
    id: 1,
    first_name: "Alex",
    last_name: "Jones",
    image: "https://picsum.photos/201",
    points: 100,
    attempts: 8,
    completed: 6,
  },
  {
    id: 2,
    first_name: "Apple",
    last_name: "Jones",
    image: "https://picsum.photos/202",
    points: 100,
    attempts: 8,
    completed: 6,
  },
  {
    id: 3,
    first_name: "Banana",
    last_name: "Jones",
    image: "https://picsum.photos/203",
    points: 100,
    attempts: 8,
    completed: 6,
  },
  {
    id: 4,
    first_name: "Donut",
    last_name: "Jones",
    image: "https://picsum.photos/204",
    points: 100,
    attempts: 8,
    completed: 6,
  },
  {
    id: 5,
    first_name: "Pipi",
    last_name: "Jones",
    image: "https://picsum.photos/205",
    points: 100,
    attempts: 8,
    completed: 6,
  },
  {
    id: 6,
    first_name: "Cici",
    last_name: "Jones",
    image: "https://picsum.photos/206",
    points: 100,
    attempts: 8,
    completed: 6,
  },
  {
    id: 7,
    first_name: "Killi",
    last_name: "Jones",
    image: "https://picsum.photos/207",
    points: 100,
    attempts: 8,
    completed: 6,
  },
  {
    id: 8,
    first_name: "Susain",
    last_name: "Jones",
    image: "https://picsum.photos/208",
    points: 100,
    attempts: 8,
    completed: 6,
  },
  {
    id: 9,
    first_name: "Milo",
    last_name: "Jones",
    image: "https://picsum.photos/209",
    points: 100,
    attempts: 8,
    completed: 6,
  },
];

const Leaderboard: React.FC = () => {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ maxWidth: "75vw", margin: "auto" }}>
        <h2>Leaderboard</h2>
        <TableContainer component={Paper}>
          <Table style={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>S.no</TableCell>
                <TableCell></TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Problems Solved</TableCell>
                <TableCell>Problems Attempted</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboardData.map((user, idx) => (
                <TableRow key={user?.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>
                    <Avatar alt={user?.image} src={user?.image} />
                  </TableCell>
                  <TableCell>{`${user?.first_name} ${user?.last_name}`}</TableCell>
                  <TableCell>{user?.points}</TableCell>
                  <TableCell>{user?.completed}</TableCell>
                  <TableCell>{user?.attempts}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Leaderboard;
