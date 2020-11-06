import sort from 'fast-sort';

import Member from '../providers/models/IMemberProvider';

export default function sortMembers(members: Member[]): Member[] {
  sort(members).by([
    { asc: 'permission' },
    {
      asc: 'name',
      comparer: new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: 'base',
      }).compare,
    },
  ]);
  return members.sort((a, b) => {
    const scoreA = a.active ? 1 : 0;
    const scoreB = b.active ? 1 : 0;
    return scoreB - scoreA;
  });
}
