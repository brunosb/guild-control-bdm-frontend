import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Redirect } from 'react-router-dom';
import sort from 'fast-sort';

import DataTable, {
  IDataTableColumn,
  createTheme,
} from 'react-data-table-component';
import { Toggle } from 'react-toggle-component';
import { FiPlus, FiMinus } from 'react-icons/fi';
import Header from '../../components/Header';

import { Container, Content, Profile, Settings } from './styles';
import { useAuth } from '../../hooks/auth';
import { useFetch } from '../../hooks/useFetch';
import Button from '../../components/Button';

interface Member {
  id: string;
  name: string;
  whatsapp: string;
  classe: string;
  sub_class: string;
  permission: 'Master' | 'Officer' | 'Player';
  cp: number;
  strike: number | null;
  active: boolean;
  avatar_url: string;
}

const GuildMembers: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const { user } = useAuth();
  const leader = user.permission === 'Master' || user.permission === 'Officer';

  const { data } = useFetch<Member[]>('/users/list');

  useEffect(() => {
    if (data) {
      sort(data).by([
        { asc: 'permission' },
        {
          asc: 'name',
          comparer: new Intl.Collator(undefined, {
            numeric: true,
            sensitivity: 'base',
          }).compare,
        },
      ]);
      data.sort((a, b) => {
        const scoreA = a.active ? 1 : 0;
        const scoreB = b.active ? 1 : 0;
        return scoreB - scoreA;
      });

      setMembers([...data]);
    }
  }, [data]);

  const handleChangeActive = useCallback(async (id: string) => {
    console.log(`change active id: ${id}`);
  }, []);

  const handleAddStrike = useCallback(async (id: string) => {
    console.log(`clicou no add strike no player: ${id}`);
  }, []);

  const handleRemoveStrike = useCallback(async (id: string) => {
    console.log(`clicou no remove strike no player: ${id}`);
  }, []);

  const handleClickRowTable = useCallback((member) => {
    console.log('selecionou a linha', member);
  }, []);

  createTheme('brasucas', {
    text: {
      primary: '#f4ede8',
      secondary: '#f99000',
      disabled: '#666360',
    },
    background: {
      default: '#312e38',
    },
    sortFocus: {
      default: '#f99000',
    },
    divider: {
      default: '#312e38',
    },
    highlightOnHover: {
      default: '#232129',
      text: '#f99000',
    },
  });

  const tableColumns = useMemo<IDataTableColumn[]>(
    () => [
      {
        name: 'id',
        selector: 'id',
        omit: true,
      },
      {
        name: 'Nome',
        selector: 'name',
        sortable: true,
        minWidth: '120px',
      },
      {
        name: 'Classe',
        selector: 'classe',
        sortable: true,
        wrap: true,
        minWidth: '110px',
      },
      {
        name: 'Sub Classe',
        selector: 'sub_class',
        sortable: true,
        minWidth: '110px',
      },
      {
        name: 'Ativo',
        cell: (row) => (
          <Toggle
            name={`active-${row.id}`}
            checked={row.active}
            rightBackgroundColor="#312e38"
            leftBackgroundColor="#312e38"
            rightBorderColor="#f99000"
            rightKnobColor="#f99000"
            onToggle={() => handleChangeActive(row.id)}
          />
        ),
        selector: 'active',
        sortable: true,
        ignoreRowClick: true,
        allowOverflow: true,
      },
      {
        name: 'Strike',
        cell: (row) => (
          <>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Button
                style={{ height: '16px', width: '16px', padding: 0, margin: 0 }}
                onClick={() => handleRemoveStrike(row.id)}
              >
                <FiMinus />
              </Button>
              <span>{row.strike}</span>
              <Button
                style={{ height: '16px', width: '16px', padding: 0, margin: 0 }}
                onClick={() => handleAddStrike(row.id)}
              >
                <FiPlus />
              </Button>
            </div>
          </>
        ),
        selector: 'strike',
        sortable: true,
        center: true,
      },
      {
        name: 'Permissão',
        selector: 'permission',
        sortable: true,
        center: true,
      },
    ],
    [handleAddStrike, handleRemoveStrike, handleChangeActive],
  );

  return leader ? (
    <Container>
      <Header />
      <Content>
        <Profile />
        <Settings>
          <DataTable
            className="table-members"
            title="Membros da Guild"
            data={members}
            columns={tableColumns}
            fixedHeader
            highlightOnHover
            theme="brasucas"
            onRowClicked={handleClickRowTable}
          />
        </Settings>
      </Content>
    </Container>
  ) : (
    <Redirect to="/dashboard" />
  );
};

export default GuildMembers;
