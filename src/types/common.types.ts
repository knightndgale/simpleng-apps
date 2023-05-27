export type DisclosureState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};
