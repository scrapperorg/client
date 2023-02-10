export {}

// import React, { useContext, useState } from 'react';
// import { Typography, IconButton } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import { InteractiveComponentsContext } from 'contexts/interactiveComponentsContext';
// import { Modal } from 'components/modal';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import EventBusyIcon from '@mui/icons-material/EventBusy';
// import { pink } from '@mui/material/colors';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemButton from '@mui/material/ListItemButton';
// import { MonitorContext } from 'screens/monitor/context';
// import { DocumentDetailsContext } from 'screens/documentDetails/context';
// import { DocumentDto, QueryAll } from 'services/api/dtos';
// import { documentApiService } from 'services/api/DocumentApiService';
// import { usePaginatedApiService } from 'hooks/usePaginatedApiService';

// export const NotificationsModal = () => {
//   // const { isModalOpened, closeModal, modalName } = useContext(InteractiveComponentsContext);
//   const { closeModal, modalName } = useContext(InteractiveComponentsContext);
//   const [dueDate, setDueDate] = useState<Date | null>(null);
//   const [notifications, setNotifications] = useState<string[]>([]);

//   const { data } = usePaginatedApiService<QueryAll<DocumentDto>>(
//     documentApiService,
//     documentApiService.getDocuments,
//     100,
//   );
//   const overdueDocuments = data?.results.filter((doc) => doc.deadline !== undefined);
//   console.log(overdueDocuments);

//   const checkIfDocumentIsOverdue = () => {
//     const today = new Date();
//     overdueDocuments?.forEach((document) => {
//       const overdueDate = document.deadline ? new Date(document.deadline) : undefined;
//       const threeDaysNotice = overdueDate ? new Date(overdueDate) : undefined;
//       if (threeDaysNotice && overdueDate) threeDaysNotice.setDate(overdueDate.getDate() - 3);

//       if (overdueDate && threeDaysNotice && today >= threeDaysNotice && today < overdueDate) {
//         console.log(`${document.title} is due in 3 days`)
//       }
//     });
//   };

//   // setInterval(checkIfDocumentIsOverdue, 10000)

//   return (
//     <Modal
//       // isModalOpened={isModalOpened && modalName === 'notifications-modal'}
//       isModalOpened={modalName === 'notifications-modal'}
//       closeModal={closeModal}
//     >
//       <IconButton
//         aria-label='close'
//         onClick={closeModal}
//         sx={{
//           position: 'absolute',
//           right: 8,
//           top: 8,
//           zIndex: 100,
//         }}
//       >
//         <CloseIcon />
//       </IconButton>
//       <List>
//         <ListItem alignItems='center'>
//           <ListItemText>Notificari</ListItemText>
//         </ListItem>
//         <ListItem alignItems='flex-start'>
//           <ListItemButton>
//             <ListItemAvatar>
//               <EventBusyIcon sx={{ color: pink[400] }} fontSize='large' />
//             </ListItemAvatar>
//             <ListItemText
//               primary='Data limita atinsa'
//               secondary={
//                 <React.Fragment>
//                   <Typography
//                     sx={{ display: 'inline' }}
//                     component='span'
//                     variant='body2'
//                     color='text.primary'
//                   >
//                     Document x
//                   </Typography>
//                   {' A expirat pe data Ysdgsagddsagsadgdsagasgda'}
//                 </React.Fragment>
//               }
//             />
//           </ListItemButton>
//         </ListItem>
//       </List>
//     </Modal>
//   );
// };
