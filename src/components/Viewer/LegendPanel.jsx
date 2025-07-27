import {useMemo} from "react";

// Helper function
function parseLabelName(rawName = '') {
    // Expected formats: "12_Left-Caudate", "12:Left-Caudate", fallback: rawName
    const m = rawName.match(/^(\d+)[_:](.+)$/);
    if (m) {
        return {
            idNum: parseInt(m[1], 10),
            labelName: m[2],
            display: `#${m[1]} ${m[2]}`,
        };
    }
    return { idNum: null, labelName: rawName, display: rawName };
}

// Updated LegendPanel
export default function LegendPanel({ width, structures, setStructures, filter, setFilter, selectedId, setSelectedId }) {

    // Enrich each structure with parsed naming
    const enriched = useMemo(() => {
        return structures.map(s => {
            const parsed = parseLabelName(s.name);
            return { ...s, ...parsed };
        });
    }, [structures]);

    // Sorting: numeric ID first, else alphabetically
    const sorted = useMemo(() => {
        return [...enriched].sort((a, b) => {
            if (a.idNum != null && b.idNum != null) return a.idNum - b.idNum;
            if (a.idNum != null) return -1;
            if (b.idNum != null) return 1;
            return a.name.localeCompare(b.name);
        });
    }, [enriched]);

    const filtered = useMemo(() => {
        const f = filter.trim().toLowerCase();
        if (!f) return sorted;
        return sorted.filter(s => {
            const idMatch = s.idNum != null && s.idNum.toString().startsWith(f);
            const nameMatch = s.labelName.toLowerCase().includes(f) || s.name.toLowerCase().includes(f);
            return idMatch || nameMatch;
        });
    }, [sorted, filter]);

    function toggleVisibility(id) {
        setStructures(prev => prev.map(s => s.id === id ? { ...s, visible: !s.visible } : s));
    }

    function solo(id) {
        const visibleCount = structures.filter(s => s.visible).length;
        const target = structures.find(s => s.id === id);
        const soloing = !(visibleCount === 1 && target?.visible);
        setStructures(prev =>
            prev.map(s => s.id === id ? { ...s, visible: true } : { ...s, visible: !soloing ? s.visible : false })
        );
    }

    // Bulk operations preserve order & IDs
    function showAll() {
        setStructures(prev => prev.map(s => ({ ...s, visible: true })));
    }
    function hideAll() {
        setStructures(prev => prev.map(s => ({ ...s, visible: false })));
    }

    return (
        <div style={{
            width,
            background: '#1a1a1d',
            color: '#eee',
            padding: '8px 10px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid #333',
            fontSize: 12
        }}>
            <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Structures</div>
            <input
                placeholder="Filter by ID or name..."
                value={filter}
                onChange={e => setFilter(e.target.value)}
                style={{
                    background: '#2a2a2e',
                    color: '#fff',
                    border: '1px solid #333',
                    borderRadius: 4,
                    padding: '4px 6px',
                    marginBottom: 6,
                    fontSize: 12
                }}
            />
            <div style={{ flex: 1, overflowY: 'auto', fontSize: 12 }}>
                {filtered.map(s => {
                    const displayName = s.display || s.name;
                    return (
                        <div
                            key={s.id}
                            onClick={() => setSelectedId(s.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                padding: '4px 4px',
                                cursor: 'pointer',
                                borderRadius: 4,
                                userSelect: 'none',
                                background: selectedId === s.id ? '#33394a' : 'transparent'
                            }}
                            title="Click to select. Shift+Click to solo. Middle-click to toggle visibility."
                            onMouseDown={e => {
                                if (e.shiftKey) { solo(s.id); e.preventDefault(); }
                                if (e.button === 1) { toggleVisibility(s.id); e.preventDefault(); }
                            }}
                        >
                            <button
                                onClick={e => { e.stopPropagation(); toggleVisibility(s.id); }}
                                style={{
                                    width: 18,
                                    height: 18,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: 10,
                                    background: s.visible ? '#2f343a' : '#26262a',
                                    border: '1px solid #444',
                                    borderRadius: 2,
                                    color: s.visible ? '#fff' : '#888',
                                    cursor: 'pointer'
                                }}
                                aria-label={s.visible ? 'Hide structure' : 'Show structure'}
                            >
                                {s.visible ? '👁' : '×'}
                            </button>
                            <div style={{
                                width: 14,
                                height: 14,
                                borderRadius: 2,
                                background: `rgb(${s.color[0]},${s.color[1]},${s.color[2]})`,
                                border: '1px solid #444',
                                flexShrink: 0
                            }} />
                            <div style={{
                                flex: 1,
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                fontVariantNumeric: 'tabular-nums'
                            }}>
                                {displayName}
                            </div>
                        </div>
                    );
                })}
                {filtered.length === 0 && <div style={{ opacity: 0.6 }}>No matches</div>}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <button onClick={showAll} style={btnStyle}>Show All</button>
                <button onClick={hideAll} style={btnStyle}>Hide All</button>
            </div>
        </div>
    );
}

const btnStyle = {
    flex: 1,
    background: '#2d2f36',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: 4,
    padding: '4px 6px',
    fontSize: 11,
    cursor: 'pointer'
};