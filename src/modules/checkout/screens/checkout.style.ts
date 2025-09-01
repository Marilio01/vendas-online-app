// Em: src/modules/checkout/screens/checkout.style.ts
import { StyleSheet } from 'react-native';
import { theme } from '../../../shared/themes/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
        color: '#333',
    },
    card: {
        backgroundColor: theme.colors.neutralTheme.white,
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    addressItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: theme.colors.grayTheme.gray80,
        borderRadius: 8,
        marginBottom: 8,
    },
    selectedAddressItem: {
        borderColor: theme.colors.mainTheme.primary,
        backgroundColor: '#f0e6f7',
    },
    addressContent: {
        flex: 1,
        marginLeft: 12,
    },
    summaryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    summaryItemName: { flex: 1 },
    summaryItemPrice: {},
    summaryDivider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 12,
    },
    summaryTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footer: {
        padding: 16,
        backgroundColor: theme.colors.neutralTheme.white,
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { backgroundColor: 'white', borderRadius: 8, padding: 24, width: '80%', alignItems: 'center' },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
    modalText: { fontSize: 16, textAlign: 'center', marginBottom: 24 },
    modalButtons: { flexDirection: 'row', justifyContent: 'center', width: '100%' },
});