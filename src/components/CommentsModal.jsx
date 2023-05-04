import { modalAtom } from "@/atom/ModalAtom";
import { useRecoilValue } from "recoil";

export default function CommentModal() {
  const openModal = useRecoilValue(modalAtom);
  return (
    <>
      <p>ComentModal</p>
      {openModal && <p>Modal Is Open</p>}
    </>
  );
}
