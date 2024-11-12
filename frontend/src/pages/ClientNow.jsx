import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ClientNow() {
  const { currentUser } = useSelector((state) => state.user);
  const { clientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState([]);
  const [deleteId, setDeleteId] = useState("");
  const [formData, setFormData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [isDisp, setIsDisp] = useState(false);
  const navigate = useNavigate();

  console.log(post);
  console.log(currentUser._id);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/server/clients/get-clients?clientId=${clientId}`
        );
        let data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.clients[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [clientId]);

  // const handleDispenseOLD = async () => {
  //   setOpenModal(false);

  //   try {
  //     const res = await fetch(
  //       `/server/clients/dispensed/${deleteId}/${currentUser._id}`,
  //       { method: "DELETE" }
  //     );

  //     const data = await res.json();

  //     if (!res.ok) {
  //       console.log(data.message);
  //     } else {
  //       setPost((prev) => prev.filter((post) => post._id !== deleteId));
  //     }
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  console.log(post.isDispensed);

  const setNewData = (isDispensed) => {
    isDispensed = true;

    setFormData({
      isDispensed: isDispensed,
    });
  };

  const handleDispense = async () => {
    setOpenModal(false);

    try {
      const res = await fetch(
        `/server/clients/dispensed/${deleteId}/${currentUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      if (res.ok) {
        setError(null);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-[80svh] flex flex-col gap-6 justify-center max-w-6xl mx-auto mt-5 px-10">
      <div className="flex flex-1 gap-4 flex-wrap items-center justify-center rounded-2xl">
        <div className="text-3xl w-full font-bold text-center">
          You're Expecting Client Number
        </div>
        <div className="w-full max-w-xl h-80 bg-blue-950 rounded-2xl flex items-center justify-center text-white text-[200px] font-bold">
          {post.tally}
        </div>
      </div>

      <div className="flex items-center gap-5 w-full max-w-xl mx-auto">
        <Button
          onClick={() => {
            setOpenModal(true);
            setNewData(post.isDispensed);
            setDeleteId(post._id);
          }}
          className="w-full"
        >
          Dispensed
        </Button>
      </div>

      {/* modal */}
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you are done with the dispensing to this client?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDispense}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
