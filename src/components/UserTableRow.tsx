import React, {FC} from "react";
import { WrapItem, Avatar, Flex, Text} from "@chakra-ui/react"
import {UserNode} from "../helpers/queries"

interface UserTableRowProps {
  user: UserNode;
}

const UserTableRow: FC<UserTableRowProps> = (props) => {
    const {url, avatarUrl, followers, following, name, login, bio, starredRepositories} = props.user.node;
    return( 
    <a href={url} target="_blank" rel="noreferrer">
      <WrapItem justifyContent="left" my={2} p={2} bg="gray.50" boxShadow="md" rounded="md" alignItems="center">
        <Avatar size="xl" name={login} src={avatarUrl} />
        <Flex direction="column" ml={2} px={2} py={1}>
          <Text textAlign="left" my={1} fontSize="lg" fontWeight="bold">{name || "no_name"} - {login || "no_username"}</Text>
          <Text color="gray.700" fontSize="xs" my={1}>
            <strong>Followers: </strong> {followers?.totalCount || 0}{"\t"}
            <strong>Following: </strong> {following?.totalCount || 0}{"\t"}
            <strong>Starred Repos: </strong> {starredRepositories?.totalCount || 0}
          </Text>
          <Text color="gray.600" my={1} fontSize="sm">{bio || "I have no bio."}</Text>
        </Flex>
      </WrapItem>
    </a>
    )
}

export default UserTableRow;