import {
  Avatar,
  Badge,
  Box,
  Container,
  HStack,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { formatDate } from "../../../utils/format-date";
import { useRouter } from "next/router";

const PostAuthor = ({ author, post }: any) => {
  const { locale } = useRouter();

  return (
    <Stack
      mt={6}
      direction={"row"}
      spacing={4}
      align={"center"}
      borderRadius={"md"}
      display={"inline-flex"}
      py={2}
      px={4}
      m={0}
    >
      <Avatar src={author.photo.url} />
      <Stack direction={"column"} spacing={0} fontSize={"sm"}>
        <HStack>
          <Text fontWeight={600} color={"purple.300"} as={"b"}>
            {author.name}
          </Text>
          <Badge colorScheme="purple">Author</Badge>
        </HStack>
        <Text color={"gray.500"} align={"left"} textTransform={"capitalize"}>
          {formatDate(new Date(post.createdAt), locale!)}
        </Text>
      </Stack>
    </Stack>
  );
};

export default PostAuthor;
