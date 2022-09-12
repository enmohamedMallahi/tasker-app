// Hooks
import { useState } from 'react';
import { useTodos } from '../contexts/TodosContext';
import { useAutoAnimate } from '@formkit/auto-animate/react';

// Comp
import Link from 'next/link';
import {
	Inbox,
	Calendar,
	Archive,
	Trash2,
	ChevronRight,
	ChevronDown,
	Command,
} from 'react-feather';

const Sidebar = () => {
	const [showTags, setShowTags] = useState(false);
	const { getTags } = useTodos();
	const tags = getTags();
	const [listRef] = useAutoAnimate();

	return (
		<aside className='container' ref={listRef}>
			<Link href={`/tag/inbox`}>
				<div className='splite-row splite-center mb'>
					<Inbox />
					<h4>Inbox</h4>
				</div>
			</Link>
			<div className='splite-row splite-center mb'>
				<Calendar />
				<h4>Today</h4>
			</div>

			<div
				onClick={(e) => setShowTags((p) => !p)}
				className='splite-row splite-center mb'
			>
				{showTags ? <ChevronDown /> : <ChevronRight />}
				<h4>Projects</h4>
			</div>
			{showTags && (
				<>
					{tags
						.filter((tag) => tag !== 'inbox')
						.map((tag) => (
							<Link key={tag} href={`/tag/${tag}`}>
								<div className='splite-row splite-center mb'>
									<Command />
									<h4>{tag}</h4>
								</div>
							</Link>
						))}
				</>
			)}
			<div className='splite-row splite-center mb'>
				<Archive />
				<h4>Archive</h4>
			</div>
		</aside>
	);
};

export default Sidebar;
