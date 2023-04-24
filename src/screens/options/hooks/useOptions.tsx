import { useContext } from 'react';
import { OptionsContext } from '../context';
import { keywordApiService } from '../../../services/api/KeywordApiService';

export function useOptions() {
  const { keywords, getAllKeywords } = useContext(OptionsContext);
  const createKeyword = async (name: string) => {
    const res = await keywordApiService.create(name);
    if (res.success) {
      await getAllKeywords();
    }

    return res.payload;
  };

  const updateKeyword = async (id: string, name: string) => {
    const res = await keywordApiService.update(id, name);
    if (res.success) {
      await getAllKeywords();
    }
    return res.payload;
  };

  const deleteKeyword = async (id: string) => {
    const res = await keywordApiService.delete(id);

    if (res.success) {
      await getAllKeywords();
    }
    return res.success;
  };

  const getAll = async () => {
    const res = await keywordApiService.getAll();
    return res.payload;
  };

  return {
    keywords,
    createKeyword,
    updateKeyword,
    deleteKeyword,
    getAll,
  };
}
