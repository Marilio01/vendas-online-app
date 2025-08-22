
import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/themes/theme';

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.neutralTheme.white },
    listContent: { flexGrow: 1 },
    itemContainer: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',

    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 12,
        flexDirection: 'row',

    },

    infoContainer: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        marginBottom: 20,
    },

    quantityContainer: {
        flex: 0.3

    },

    deleteButton: {
        padding: 20,
        marginLeft: 150,
    },
    footer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    totalText: {
        fontSize: 18,
        color: '#666',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
    },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { backgroundColor: 'white', borderRadius: 8, padding: 24, width: '80%', alignItems: 'center' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
    modalText: { fontSize: 16, textAlign: 'center', marginBottom: 24 },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
});

export default styles;