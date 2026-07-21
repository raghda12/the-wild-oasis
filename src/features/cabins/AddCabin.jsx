import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable";
function AddCabin() {
  return <Modal >
    <Modal.Open opensWindowName="cabin-form">
      <Button>Add new cabin</Button>
    </Modal.Open>
    <Modal.Window name="cabin-form">
      <CreateCabinForm onCloseModal={() => {}} />
    </Modal.Window>

    <Modal.Open opensWindowName="cabin-table">
      <Button>Show table</Button>
    </Modal.Open>
    <Modal.Window name="cabin-table">
      <CabinTable />
    </Modal.Window>
  </Modal>
}
export default AddCabin;
// export default function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>

//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
