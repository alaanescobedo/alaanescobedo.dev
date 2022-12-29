import { Badge, Box, Icon } from "@chakra-ui/react";
import { BiGitPullRequest, BiGitMerge } from "react-icons/bi";
import { VscGitPullRequestClosed } from "react-icons/vsc";

interface GitPrStatusProps {
  status: "open" | "merged" | "closed";
}

const PR_STATUS = {
  open: {
    color: "green.500",
    icon: BiGitPullRequest,
    label: "Open",
  },
  merged: {
    color: "purple.500",
    icon: BiGitMerge,
    label: "Merged",
  },
  closed: {
    color: "red.500",
    icon: VscGitPullRequestClosed,
    label: "Closed",
  },
} as const;
const GitPrStatusBadge = ({ status }: GitPrStatusProps) => {
  const { color, icon, label } = PR_STATUS[status];

  return (
    <Badge
      bg={color}
      color="white"
      borderRadius="full"
      px="2.5"
      display={"flex"}
      alignItems={"center"}
      textTransform="capitalize"
      gap={"2px"}
      justifyContent={"center"}
    >
      <Icon as={icon} />
      {label}
    </Badge>
  );
};

export default GitPrStatusBadge;
