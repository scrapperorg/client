import { useContext, useState } from 'react';
import { OptionsContext } from '../context';
import { keywordApiService } from '../../../services/api/KeywordApiService';
import { KeywordDto } from '../../../services/api/dtos/keyword';

export function useOptions() {
  const { keywords, getAllKeywords } = useContext(OptionsContext);
  const [keywordToEdit, setKeywordToEdit] = useState<KeywordDto | null>(null);
  const [keywordToDelete, setKeywordToDelete] = useState<KeywordDto | null>(null);
  const createKeyword = async (name: string) => {
    const res = await keywordApiService.create(name);
    if (res.success) {
      await getAllKeywords();
    }

    return res.payload;
  };

  const updateKeyword = async (name: string) => {
    if (!keywordToEdit) {
      return;
    }

    const res = await keywordApiService.update(keywordToEdit.id, name);
    if (res.success) {
      await getAllKeywords();
    }
    return res.payload;
  };

  const deleteKeyword = async () => {
    if (!keywordToDelete) {
      return;
    }
    const res = await keywordApiService.delete(keywordToDelete.id);

    if (res.success) {
      await getAllKeywords();
    }
    return res.success;
  };

  const getAll = async () => {
    const res = await keywordApiService.getAll();
    return res.payload;
  };

  const createEditKeyword = async (name: string) => {
    if (keywordToEdit) {
      return await updateKeyword(name);
    }

    return await createKeyword(name);
  };

  return {
    keywords,
    keywordToEdit,
    createEditKeyword,
    deleteKeyword,
    getAll,
    setKeywordToEdit,
    setKeywordToDelete,
  };
}
