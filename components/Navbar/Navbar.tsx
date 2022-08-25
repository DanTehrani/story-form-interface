import {
  Box,
  Flex,
  IconButton,
  Collapse,
  Link,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useAccount, useDisconnect } from "wagmi";
import ConnectWalletButton from "../ConnectWalletButton";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import path from "path";

const StyledLink = props => {
  return (
    <Link
      {...props}
      _hover=""
      fontSize={"sm"}
      fontWeight={500}
      p={2}
      color={useColorModeValue("gray.600", "gray.200")}
    ></Link>
  );
};

const getShortenAddress = (account: string) =>
  `${account.slice(0, 6)}...${account.slice(7, 11)}`;

const Navbar = () => {
  const { t } = useTranslation("common");
  const { isOpen, onToggle } = useDisclosure();
  const { pathname } = useRouter();

  const { isConnected, address } = useAccount();
  const { disconnect } = useDisconnect();

  const NAV_ITEMS = [
    {
      label: t("create-a-form"),
      url: "/create"
    }
  ];

  if (pathname === "/forms/[formId]") {
    return <></>;
  }

  return (
    <Box backgroundImage="radial-gradient( circle farthest-corner at 10% 20%,  rgba(111,111,219,1) 0%, rgba(182,109,246,1) 72.4% );">
      <Flex
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        align={"center"}
        justify="space-between"
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex justify={{ base: "center", md: "start" }} align="center">
          <Text display={{ base: "none", md: "flex" }} fontWeight={600}>
            <Link
              href="/forms"
              _hover={{
                textDecoration: "none"
              }}
            >
              Storyform
            </Link>
          </Text>
          <Box ml={4} display={{ base: "none", md: "flex" }} p="4px" gap={1}>
            {NAV_ITEMS.map(({ label, url }, i) => (
              <StyledLink key={i} href={url}>
                <Text color="blackAlpha.700">{label}</Text>
              </StyledLink>
            ))}
          </Box>
        </Flex>
        <Flex>
          <Box mr={4}>
            {isConnected ? (
              <Button
                variant="outline"
                onClick={() => {
                  disconnect();
                }}
              >
                {address && getShortenAddress(address)}
              </Button>
            ) : (
              <ConnectWalletButton></ConnectWalletButton>
            )}
          </Box>
          {isConnected ? (
            <Menu>
              <MenuButton
                bgColor="transparent"
                _active={{
                  bgColor: "transparent"
                }}
                _hover={{
                  bgColor: "transparent"
                }}
                as={IconButton}
                icon={<HamburgerIcon />}
              ></MenuButton>
              <MenuList>
                <Link href="/user/forms">
                  <MenuItem>Your forms</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          ) : (
            <></>
          )}
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        {NAV_ITEMS.map(({ label, url }, i) => (
          <Box p={4} display={{ md: "none" }} key={i}>
            <StyledLink href={url} color="black">
              {label}
            </StyledLink>
          </Box>
        ))}
      </Collapse>
    </Box>
  );
};

export default Navbar;
