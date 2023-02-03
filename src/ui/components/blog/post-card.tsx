import {
  AspectRatio,
  Avatar,
  Badge,
  Box,
  Container,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { formatDate } from "../../../utils/format-date";
import NextLink from "next/link";
import { useRouter } from "next/router";

const PostCard = ({ post }: any) => {
  const { locale } = useRouter();

  return (
    <VStack
      mt={6}
      direction={"row"}
      spacing={4}
      align={"center"}
      border={"2px"}
      borderColor={"blackAlpha.500"}
      borderRadius={"lg"}
      px={2}
      py={4}
      bg={"gray.800"}
      w={"full"}
    >
      <Box w="100%" h="auto" borderRadius={"lg"} overflow={"hidden"}>
        <AspectRatio maxW={"full"} ratio={16 / 9}>
          <NextLink href={`/notes/${post.slug}`}>
            <NextImage
              src={post.featuredImage.url}
              alt={"featured image"}
              fill
            />
          </NextLink>
        </AspectRatio>
      </Box>
      <VStack px={4} py={2} flex={1}>
        {/* Title */}
        <Heading
          as={"h4"}
          textAlign={"center"}
          color={"blue.400"}
          fontSize={"x-large"}
        >
          <Link
            as={NextLink}
            href={`/notes/${post.slug}`}
            sx={{
              _hover: { textDecoration: "underline" },
            }}
          >
            {post.title}
          </Link>
        </Heading>
        {/* Author */}
        <Box w={"full"} justifyContent={"left"} color={"purple.400"}>
          <HStack>
            <Text fontWeight={600} textTransform={"capitalize"}>
              {formatDate(new Date(post.createdAt), locale!)}
            </Text>
          </HStack>
        </Box>
        {/* Excerpt */}
        <Box flex={1} py={2}>
          <Text>{post.excerpt}</Text>
        </Box>
        {/* Categories */}
        <HStack w={"full"} justifyContent={"end"}>
          {post.categories.map((category: any) => (
            <Badge key={category.name} colorScheme="green">
              {category.name}
            </Badge>
          ))}
        </HStack>
      </VStack>
    </VStack>
  );
};

export default PostCard;
