import 'react-confirm-alert/src/react-confirm-alert.css'
import { FaTrash } from 'react-icons/fa'

export const Confirm = (action: () => void) => {
  return {
    customUI: ({ onClose }: { onClose: () => void }) => {
      return (
        <div className="px-5 py-3 shadow-xl bg-gray-200 rounded-lg text-center text-dark">
          <h1 className="text-[25px]">Are you sure?</h1>
          <p className="text-[25px]">You want to delete this?</p>
          <div className="flex justify-between mt-4">
            <button
              className="bg-[#0057A3] rounded-lg w-[80px] h-[35px] text-white m-auto hover:bg-[#2268a7]"
              onClick={() => onClose()}
            >
              No
            </button>
            <button
              className="ml-3 bg-red-500 rounded-lg w-[150px] text-center h-[35px] text-white m-auto hover:bg-red-300 flex justify-between"
              onClick={() => {
                action()
                onClose()
              }}
            >
              <FaTrash className="m-auto" />{' '}
              <span className="m-auto">Yes, Delete it!</span>
            </button>
          </div>
        </div>
      )
    },
  }
}
