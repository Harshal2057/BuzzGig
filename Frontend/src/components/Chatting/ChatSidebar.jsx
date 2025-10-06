import { useContext } from 'react'
import { assets } from '../../assets/assets'
import { SocketContext } from '../../context/SocketContext'

const ChatSidebar = ({users}) => {

  const {setSelectedUserId} = useContext(SocketContext)


  return (
    <div className='w-full h-full bg-white-100 rounded-tl-xl rounded-bl-xl p-2'>
            {/* Main Container */}
            <div>
                {/* Inbox title */}
                <div className='relative left-5 top-5 mb-10'>
                    <p className='font-outfit text-3xl font-semibold'>Inbox</p>
                </div>

                {/* User tiles */}
                {/* <div className='bg-gray-200 h-13 w-full rounded-lg flex items-center gap-2 px-2'>
                        <img src={assets.userDefaultImage} className='size-10'/>
                        <p className='font-outfit font-medium'>Random user</p>
                </div> */}

                <div className='flex flex-col gap-2'>
                  { Array.isArray(users) &&
                    users?.map((user , index) => {
                      return(
                        <div key={index} className='bg-gray-200 h-13 rounded-lg flex items-center gap-2 px-1'
                              onClick={() => setSelectedUserId(user)}
                        >
                            {/* profile pic */}
                            <div>
                              <img src={assets.userDefaultImage} className='size-10'/>
                            </div>
                            <p className='font-semibold font-outfit'>{user.name}</p>
                        </div>
                      )
                    })
                  }
                </div>

            </div>
    </div>
  )
}

export default ChatSidebar