import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { FormattedDate } from '../../../../components/formatedDate';
import React from 'react';
import { DocumentDto, UserDto } from '../../../../services/api/dtos';
import { AssignResponsibleModal } from '../assignResponsibleModal';
import { ModalNames } from 'constants/modals';
import { Translations } from 'constants/translations';
import { AssignResponsibleModalFormValues } from 'screens/documentDetails/hooks/useDocumentDetails';
import { UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface DocumentActivityProps {
  document: DocumentDto;
  isModalOpened: boolean;
  assignableResponsibles: UserDto[];
  assignResponsible: (userId: string) => void;
  setDeadline: (date: string | undefined) => void;
  openModal: (modalName: string) => void;
  setStatus: (status: string) => void;
  setDecision: (status: string) => void;
  form: UseFormReturn<AssignResponsibleModalFormValues, any>;
  handleSubmitDocumentAnalysis: (props: AssignResponsibleModalFormValues) => Promise<void>;
  resetAnalysisUpdateStatus: () => void;
  isAnalysisUpdateLoading: boolean;
  isAnalysisUpdateSuccesfull: boolean;
  analysisUpdateError: string;
}

function DocumentActivity(props: DocumentActivityProps) {
  const {
    document,
    openModal,
    assignableResponsibles,
    assignResponsible,
    setDeadline,
    setStatus,
    setDecision,
    form,
    handleSubmitDocumentAnalysis,
    resetAnalysisUpdateStatus,
    isAnalysisUpdateLoading,
    isAnalysisUpdateSuccesfull,
    analysisUpdateError
  } = props;
  const { t } = useTranslation();

  const assignedUser = document.assignedUser
    ? `${document.assignedUser.surname} ${document.assignedUser.name}`
    : t('documentView.activity.noResponsible');

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={10}>
          <Card>
            <CardContent>
              <Chip label='Analiza Legislativa' color='primary' size='medium' sx={{ mb: 3 }} />
              <Grid container spacing={4}>
                <Grid item md={4}>
                  <Typography variant='h4' sx={{ mb: 3 }}>
                    {t('documentView.activity.status')}
                  </Typography>
                  <Typography variant='h4' sx={{ mb: 3 }}>
                    {t('documentView.activity.responsible')}
                  </Typography>
                  <Typography variant='h4' sx={{ mb: 3 }}>
                    {t('documentView.activity.deadline')}
                  </Typography>
                  <Typography variant='h4' sx={{ mb: 3 }}>
                    {t('documentView.activity.decision')}
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    {Translations[document.status]}
                  </Typography>
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    {assignedUser}
                  </Typography>
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    {document.deadline ? (
                      <FormattedDate date={document.deadline} />
                    ) : (
                      t('documentView.activity.noDeadline')
                    )}
                  </Typography>
                  <Typography variant='h5' sx={{ mb: 3 }}>
                    {Translations[document.decision]}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={2}>
          <Stack gap={4}>
            <StyledButton variant='contained'>
              <LinkNoStyle
                onClick={() => {
                  resetAnalysisUpdateStatus();
                  openModal(ModalNames.ASSIGN_RESP);
                }}
                rel='noreferrer'
              >
                {t('documentView.activity.updateAnalysis')}
              </LinkNoStyle>
            </StyledButton>
          </Stack>
        </Grid>
      </Grid>
      <AssignResponsibleModal
        assignableResponsibles={assignableResponsibles}
        assignResponsible={assignResponsible}
        responsible={document.assignedUser}
        deadline={document.deadline}
        documentStatus={document.status}
        documentDecision={document.decision}
        setDeadline={setDeadline}
        setStatus={setStatus}
        setDecision={setDecision}
        form={form}
        handleSubmitDocumentAnalysis={handleSubmitDocumentAnalysis}
        isAnalysisUpdateLoading={isAnalysisUpdateLoading}
        isAnalysisUpdateSuccesfull={isAnalysisUpdateSuccesfull}
        analysisUpdateError={analysisUpdateError}
      />
    </>
  );
}

export default React.memo(DocumentActivity);

const LinkNoStyle = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: 12px;
`;

const StyledButton = styled(Button)`
  min-height: 36.5px;
  padding: 0 !Important;
  a {
    padding: 6px 16px;
    width: 100%;
  }
`;
