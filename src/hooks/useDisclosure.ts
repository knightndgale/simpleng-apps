import { useState } from "react";
import { type DisclosureState } from "~/types/common.types";

const useDisclosure = (initialState = false): DisclosureState => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = (): void => {
    setIsOpen(true);
  };

  const close = (): void => {
    setIsOpen(false);
  };

  const toggle = (): void => {
    setIsOpen((prevState) => !prevState);
  };

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

export default useDisclosure;
