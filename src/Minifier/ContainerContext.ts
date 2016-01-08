﻿import ts = require( "typescript" );
import { Ast } from "../Ast/Ast";
import { IdentifierInfo } from "./IdentifierSymbolInfo";

import { Logger } from "../Reporting/Logger";

// TJT: Rename to Container?
export class ContainerContext {

    private container: ts.Node;
    private blockScopeContainer: ts.Node;

    private parent: ContainerContext;
    private childContainers: ContainerContext[] = [];

    private containerFlags: Ast.ContainerFlags;
    
    private isBlockScope: boolean;

<<<<<<< HEAD
    private nameIndex: number;

=======
>>>>>>> origin/master
    // TJT: Review - do we need excluded symbols and names?
    public namesExcluded: ts.Map<boolean> = {};
    public excludedIdentifiers: ts.Map<IdentifierInfo> = {};
    public symbolTable: ts.Map<IdentifierInfo> = {};

    public shortenedIdentifierCount = 0;

    constructor( node: ts.Node, containerFlags: Ast.ContainerFlags, parentContainer: ContainerContext ) {
<<<<<<< HEAD
        //Logger.log( "Container creation: ", node.kind );
=======
>>>>>>> origin/master
        this.containerFlags = containerFlags;

        if ( containerFlags & Ast.ContainerFlags.IsContainer ) {
            this.container = this.blockScopeContainer = node;
            this.isBlockScope = false;

            this.parent = this;
<<<<<<< HEAD
            
            // The name generator index starts at 0 for containers 
            this.nameIndex = 0;
        }
        else {
            if ( containerFlags & Ast.ContainerFlags.IsBlockScopedContainer ) {
                this.blockScopeContainer = node;
                this.isBlockScope = true;

                this.parent = parentContainer.getParent();
            }
            else {
                Logger.log( ">>>>> Not a container bug" );
            }
=======

            //Logger.log( "New function scoped container: ", node.kind );
        }
        else if ( containerFlags & Ast.ContainerFlags.IsBlockScopedContainer ) {
            this.blockScopeContainer = node;
            this.isBlockScope = true;

            this.parent = parentContainer.getParent();

            //Logger.log( "New block scoped container: ", node.kind );
>>>>>>> origin/master
        }
    }

    public addChildContainer( container: ContainerContext ): void {
        this.childContainers.push( container );
    }

    public getChildren(): ContainerContext[] {
        return this.childContainers;
    }

    public getParent(): ContainerContext {
        return this.parent;
    }

<<<<<<< HEAD
    // TJT: This logic needs to be reviewed for applicability to ES6 block scopes
    public getNameIndex(): number {
        if ( this.isBlockScope ) {
            // The name generator index for block scoped containers is obtained from the parent container
            return this.parent.getNameIndex();
        }

        return this.nameIndex++;
    }

    // TJT: Rename to getContainerNode()?
=======
    // TJT: Rename to getContainer()?
>>>>>>> origin/master
    public getNode(): ts.Node {
        return this.isBlockScope ? this.blockScopeContainer : this.container;
    }

<<<<<<< HEAD
=======
    // TJT: to be removed if not required
    public getLocals(): ts.SymbolTable {
        if ( this.isBlockScope )
            return ( <any>this.blockScopeContainer ).locals;
        else
            return ( <any>this.container ).locals;
    }

>>>>>>> origin/master
    public hasMembers(): boolean {
        if ( this.container ) {
            let containerSymbol: ts.Symbol = ( <any>this.container ).symbol;

            if ( containerSymbol && ( containerSymbol.flags & ts.SymbolFlags.HasMembers ) ) {
                return true;
            }
        }

        return false;
    }

    public getMembers(): ts.SymbolTable {
        if ( this.container ) {
            let containerSymbol: ts.Symbol = ( <any>this.container ).symbol;

            if ( containerSymbol && ( containerSymbol.flags & ts.SymbolFlags.HasMembers ) ) {
                return containerSymbol.members;
            }
        }

        return undefined;
    }

    public isBlockScoped(): boolean {
        return this.isBlockScope;
    }

    public isFunctionScoped(): boolean {
        if ( this.containerFlags & ( Ast.ContainerFlags.IsContainer | Ast.ContainerFlags.IsContainerWithLocals ) ) {
            return true;
        }

        return false;
    }
}