var DropNode = require('../../../common/element/dropnode');
var BlockTool = require('../../../../dplbuilder/formulacontrol/blocktype/blocktool');
var OP = require('./../part/op');
var InputString = require('../part/inputstring');
require('../../../../../../css/formula.css');

module.exports = React.createClass({
    getInitialState: function() {
        this.dragInfo = { count: 0 };
        return {
            dropMode: false,
            modify: 0
        };
    },
    onDragStart: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        this.props.dplBuilder.configController.setDragControl(this.props.control);
    },
    onDragEnter: function(e) {
        if(BlockTool.getAssignableList(this.props.control.config).indexOf(this.props.dplBuilder.configController.dragControl[0].config.type) > -1) {
            e.preventDefault();
            this.setState({dropMode: true, modify: this.state.modify});
        }
        this.dragInfo.count++;
    },
    onDragLeave: function(e) {
        this.dragInfo.count--;
        if(this.dragInfo.count <= 0)
            this.setState({dropMode: false, modify: this.state.modify});
    },
    onDropLeft: function(e) {
        var self = this;
        if(this.props.dplBuilder.configController.isDragged(this.props.control) === -1) {
            this.props.dplBuilder.configController.dragControl.forEach(function (control) {
                self.props.control.pushBefore(control.pop());
            });
            if(this.props.dplBuilder.configController.dragControl.length === 1) {
                this.props.dplBuilder.configController.selectSingleNode(this.props.dplBuilder.configController.dragControl[0]);
            }
        }
    },
    onSelelct: function(e) {
        if(e.stopPropagation) e.stopPropagation(); //MOZILLA
        else e.cancelBubble = true; //IE
        this.props.keyActionHandler.selectNode(this.props.control);
    },
    onStartModify: function(e) {
        this.setState({dropMode: this.state.dropMode, modify: 1});
    },
    onEndModify: function(newValue) {
        this.props.control.setValue(newValue);
        this.setState({dropMode: this.state.dropMode, modify: 0});
    },
    render: function() {
        var className ='formula text';

        var index = this.props.dplBuilder.configController.isExist(this.props.control);
        if(index >= 0) {
            this.props.dplBuilder.configController.setControl(this.props.control, index);
            className += ' selected';
        }

        var valueComponent = null;
        if(this.state.modify == 1) {
            valueComponent = <InputString className='formula text value' onChange={this.onEndModify} value={this.props.control.config.value} keyActionHandler={this.props.keyActionHandler}/>
        }
        else {
            var value = this.props.control.config.value;
            if(value == null || value.length <= 0) value = '\u00A0\u00A0';
            valueComponent = <span className='formula text value' onClick={this.onStartModify}>{value}</span>;
        }

        return (
            <span className={className} draggable='true' onDragStart={this.onDragStart} onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave} onClick={this.onSelelct}>
                <span className='formula-font' style={{position:'relative', top:'2px'}}>&#x2018;</span>
                {valueComponent}
                <span className='formula-font' style={{position:'relative', top:'2px'}}>&#x2019;</span>
                {this.props.index != 0 ? <OP control={this.props.control}/> : null}
                {this.state.dropMode ? <DropNode style={{position:'absolute', left:'0', top:'0', width:'24px', height:'100%'}} onDrop={this.onDropLeft} dragInfo={this.dragInfo} /> : null}
            </span>
        )
    }
});