import {
  ClipboardDocumentListIcon,
  HomeIcon,
  CpuChipIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

const Nav = [
  {
    title: "",
    path: "/",
    Icon: HomeIcon,
  },
  {
    title: "Robofriends",
    path: "/robofriends",
    Icon: CpuChipIcon,
  },
  {
    title: "Notetaker",
    path: "/notetaker",
    Icon: ClipboardDocumentListIcon,
  },
  {
    title: "FaceAI",
    path: "/faceAI",
    Icon: UserGroupIcon,
  },
];

// #############################
//! DO NOT DELETE
// Other Tabs [WIP]
// ["Weather", "/#"],
// ["News", "/#"],
// ["Snake", "/#"],
// ["CSV to JSON", "/#"],
// ["DTR Encode", "/#"],
// ["More...", "/#"],
// #############################

export default Nav;
