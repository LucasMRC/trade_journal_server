import { Router } from 'express';
import {
    createNewSymbol,
    getSymbols,
    deleteSymbol,
    updateSymbol
} from '@modules/symbol/controller/symbol.controller';

const SymbolRoutes = Router();

SymbolRoutes.post('/create', createNewSymbol);
SymbolRoutes.get('/', getSymbols);
SymbolRoutes.delete('/:id', deleteSymbol);
SymbolRoutes.put('/:id', updateSymbol);

export { SymbolRoutes };