import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { HiOutlineUsers } from "react-icons/hi2";

import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import { formatCurrency } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Button from "../../ui/Button";

const Card = styled.article`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const Photo = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  background-color: var(--color-grey-100);

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const DiscountBadge = styled.span`
  position: absolute;
  top: 1.2rem;
  left: 1.2rem;
  height: 2.6rem;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  border-radius: 999px;
  background-color: #e0a458;
  color: #1b1409;
  font-size: 1.2rem;
  font-weight: 700;
`;

/* The actions menu floats over the photo, so give its button a light disc */
const MenuSpot = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;

  & button {
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.92);
    color: #18201b;
  }

  & button:hover,
  & button[aria-expanded="true"] {
    background-color: #ffffff;
    border-color: transparent;
  }
`;

const Body = styled.div`
  padding: 1.6rem 1.8rem 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  flex-grow: 1;
`;

const Name = styled.h2`
  font-family: var(--font-serif);
  font-size: 2.2rem;
  font-weight: 500;
  color: var(--color-grey-800);
`;

const Capacity = styled.p`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.3rem;
  color: var(--color-grey-500);

  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const Footer = styled.div`
  margin-top: auto;
  padding-top: 1.4rem;
  border-top: 1px solid var(--color-grey-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Price = styled.p`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.6rem;
  font-size: 1.3rem;
  color: var(--color-grey-500);

  & strong {
    font-family: var(--font-serif);
    font-size: 2.4rem;
    font-weight: 500;
    color: var(--color-grey-800);
    font-variant-numeric: tabular-nums;
  }

  & s {
    color: var(--color-grey-500);
  }
`;

function CabinCard({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();

  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Modal>
      <Card>
        <Photo>
          <img src={image} alt={`Cabin ${name}`} />
          {discount > 0 && (
            <DiscountBadge>Save {formatCurrency(discount)}</DiscountBadge>
          )}
          <MenuSpot>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} label={`Cabin ${name} actions`} />
              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicate}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />} danger>
                    Delete
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>
          </MenuSpot>
        </Photo>

        <Body>
          <div>
            <Name>Cabin {name}</Name>
            <Capacity>
              <HiOutlineUsers />
              Up to {maxCapacity} guests
            </Capacity>
          </div>

          <Footer>
            <Price>
              <strong>{formatCurrency(regularPrice - (discount ?? 0))}</strong>
              / night
              {discount > 0 && <s>{formatCurrency(regularPrice)}</s>}
            </Price>
            <Modal.Open opens="edit">
              <Button variation="secondary" size="small">
                Edit
              </Button>
            </Modal.Open>
          </Footer>
        </Body>
      </Card>

      <Modal.Window name="edit">
        <CreateCabinForm cabinToEdit={cabin} />
      </Modal.Window>

      <Modal.Window name="delete">
        <ConfirmDelete
          resourceName="cabin"
          disabled={isDeleting}
          onConfirm={() => deleteCabin(cabinId)}
        />
      </Modal.Window>
    </Modal>
  );
}

export default CabinCard;
