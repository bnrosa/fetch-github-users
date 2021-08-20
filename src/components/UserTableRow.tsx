import React, {FC} from "react";
import { WrapItem, Avatar, Flex, Text} from "@chakra-ui/react"
import {UserNode} from "../helpers/queries"

interface UserTableRowProps {
  user: UserNode;
  key: number | string;
}

const UserTableRow: FC<UserTableRowProps> = ({user, key}) => {
    console.log(user.node.avatarUrl);
    return <WrapItem my={2} p={2} bg="gray.50" boxShadow="md" rounded="md" alignItems="center">
    <Avatar size="xl" name={user.node.login} src={user.node.avatarUrl} />
    <Flex direction="column" ml={2} px={2} py={1}>
      <Text textAlign="center" my={1} fontSize="lg" fontWeight="bold">{user.node.name || "no_name"} - {user.node.login || "no_username"}</Text>
      <Text color="gray.700" fontSize="xs" my={1}>
        <strong>Followers: </strong> {user.node.followers?.totalCount || 0}{"\t"}
        <strong>Following: </strong> {user.node.following?.totalCount || 0}{"\t"}
        <strong>Starred Repos: </strong> {user.node.starredRepositories?.totalCount || 0}
      </Text>
      <Text color="gray.600" my={1} fontSize="sm">{user.node.bio || "I have no bio."}</Text>
    </Flex>
  </WrapItem>
}

export default UserTableRow;